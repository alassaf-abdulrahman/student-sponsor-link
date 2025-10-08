import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Certificate = {
  id: string;
  name: string;
  preview: string;
  createdAt: string;
};

const mockCertificates: Certificate[] = [
  {
    id: "1",
    name: "Modern Certificate Template",
    preview: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Classic Certificate Template",
    preview: "https://images.unsplash.com/photo-1587628604439-c7d6e93e4eec?w=400",
    createdAt: "2024-02-20",
  },
  {
    id: "3",
    name: "Elegant Certificate Template",
    preview: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=400",
    createdAt: "2024-03-10",
  },
];

const Certificates = () => {
  const { toast } = useToast();
  const [certificates, setCertificates] = useState<Certificate[]>(mockCertificates);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [formData, setFormData] = useState({
    name: "",
    preview: "",
  });

  const handleOpenDialog = () => {
    setFormData({ name: "", preview: "" });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    const newCertificate: Certificate = {
      id: Date.now().toString(),
      name: formData.name,
      preview: formData.preview || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setCertificates([...certificates, newCertificate]);
    toast({
      title: "Certificate Added",
      description: "The certificate template has been added successfully.",
    });
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setCertificates(certificates.filter((c) => c.id !== id));
    toast({
      title: "Certificate Deleted",
      description: "The certificate template has been deleted.",
    });
  };

  const handlePreview = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIsPreviewOpen(true);
  };

  // Pagination
  const totalPages = Math.ceil(certificates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCertificates = certificates.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Certificates</h1>
          <p className="text-muted-foreground">Manage certificate templates</p>
        </div>
        <Button onClick={handleOpenDialog} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Certificate
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedCertificates.map((certificate) => (
          <Card key={certificate.id}>
            <CardHeader>
              <CardTitle className="text-lg">{certificate.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video rounded-lg overflow-hidden border">
                <img
                  src={certificate.preview}
                  alt={certificate.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>Added: {certificate.createdAt}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2"
                  onClick={() => handlePreview(certificate)}
                >
                  <Eye className="h-4 w-4" />
                  Preview
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(certificate.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="flex items-center px-4">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      {/* Add Certificate Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Certificate Template</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Certificate Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter certificate name"
              />
            </div>
            <div>
              <Label>Preview Image URL</Label>
              <Input
                value={formData.preview}
                onChange={(e) => setFormData({ ...formData, preview: e.target.value })}
                placeholder="Enter image URL or leave blank for default"
              />
            </div>
            {formData.preview && (
              <div className="aspect-video rounded-lg overflow-hidden border">
                <img
                  src={formData.preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!formData.name}>
              Add Certificate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedCertificate?.name}</DialogTitle>
          </DialogHeader>
          {selectedCertificate && (
            <div className="w-full">
              <img
                src={selectedCertificate.preview}
                alt={selectedCertificate.name}
                className="w-full rounded-lg"
              />
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsPreviewOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Certificates;
