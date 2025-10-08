import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit, Eye, EyeOff, Trash2, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type Scholarship = {
  id: string;
  name: string;
  sponsor: string;
  type: "Full" | "Partial";
  country: string;
  allowedPrograms: string[];
  totalBeneficiaries: number;
  openingDate: string;
  closingDate: string;
  description: string;
  status: "Open" | "Closed";
  submittedApplications: number;
  isVisible: boolean;
};

const mockScholarships: Scholarship[] = [
  {
    id: "1",
    name: "XYZ Excellence Scholarship",
    sponsor: "XYZ Foundation",
    type: "Full",
    country: "Malaysia",
    allowedPrograms: ["Bachelor", "Master", "PhD"],
    totalBeneficiaries: 50,
    openingDate: "2024-01-01",
    closingDate: "2024-12-31",
    description: "A comprehensive scholarship covering tuition, accommodation, and living expenses.",
    status: "Open",
    submittedApplications: 127,
    isVisible: true,
  },
  {
    id: "2",
    name: "ABC Merit Scholarship",
    sponsor: "ABC Corporation",
    type: "Partial",
    country: "UAE",
    allowedPrograms: ["Master", "PhD"],
    totalBeneficiaries: 30,
    openingDate: "2024-03-01",
    closingDate: "2024-06-30",
    description: "Partial scholarship for graduate students with outstanding academic records.",
    status: "Closed",
    submittedApplications: 89,
    isVisible: true,
  },
];

const Scholarships = () => {
  const { toast } = useToast();
  const [scholarships, setScholarships] = useState<Scholarship[]>(mockScholarships);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingScholarship, setEditingScholarship] = useState<Scholarship | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [formData, setFormData] = useState({
    name: "",
    sponsor: "",
    type: "Full" as "Full" | "Partial",
    country: "",
    allowedPrograms: [] as string[],
    totalBeneficiaries: 0,
    openingDate: "",
    closingDate: "",
    description: "",
  });

  const handleOpenDialog = (scholarship?: Scholarship) => {
    if (scholarship) {
      setEditingScholarship(scholarship);
      setFormData({
        name: scholarship.name,
        sponsor: scholarship.sponsor,
        type: scholarship.type,
        country: scholarship.country,
        allowedPrograms: scholarship.allowedPrograms,
        totalBeneficiaries: scholarship.totalBeneficiaries,
        openingDate: scholarship.openingDate,
        closingDate: scholarship.closingDate,
        description: scholarship.description,
      });
    } else {
      setEditingScholarship(null);
      setFormData({
        name: "",
        sponsor: "",
        type: "Full",
        country: "",
        allowedPrograms: [],
        totalBeneficiaries: 0,
        openingDate: "",
        closingDate: "",
        description: "",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingScholarship) {
      setScholarships(
        scholarships.map((s) =>
          s.id === editingScholarship.id
            ? { ...s, ...formData }
            : s
        )
      );
      toast({
        title: "Scholarship Updated",
        description: "The scholarship has been updated successfully.",
      });
    } else {
      const newScholarship: Scholarship = {
        id: Date.now().toString(),
        ...formData,
        status: "Open",
        submittedApplications: 0,
        isVisible: true,
      };
      setScholarships([...scholarships, newScholarship]);
      toast({
        title: "Scholarship Created",
        description: "The scholarship has been created successfully.",
      });
    }
    setIsDialogOpen(false);
  };

  const handleToggleStatus = (id: string) => {
    setScholarships(
      scholarships.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "Open" ? "Closed" : "Open" }
          : s
      )
    );
    toast({
      title: "Status Updated",
      description: "The scholarship status has been updated.",
    });
  };

  const handleToggleVisibility = (id: string) => {
    setScholarships(
      scholarships.map((s) =>
        s.id === id ? { ...s, isVisible: !s.isVisible } : s
      )
    );
    toast({
      title: "Visibility Updated",
      description: "The scholarship visibility has been updated.",
    });
  };

  const handleDelete = (id: string) => {
    setScholarships(scholarships.filter((s) => s.id !== id));
    toast({
      title: "Scholarship Deleted",
      description: "The scholarship has been deleted.",
    });
  };

  const toggleProgram = (program: string) => {
    setFormData((prev) => ({
      ...prev,
      allowedPrograms: prev.allowedPrograms.includes(program)
        ? prev.allowedPrograms.filter((p) => p !== program)
        : [...prev.allowedPrograms, program],
    }));
  };

  // Pagination
  const totalPages = Math.ceil(scholarships.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedScholarships = scholarships.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Scholarships</h1>
          <p className="text-muted-foreground">Manage scholarship programs</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Scholarship
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Scholarship Name</TableHead>
              <TableHead>Sponsor Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Applications</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedScholarships.map((scholarship) => (
              <TableRow key={scholarship.id}>
                <TableCell className="font-medium">{scholarship.name}</TableCell>
                <TableCell>{scholarship.sponsor}</TableCell>
                <TableCell>
                  <Badge variant={scholarship.type === "Full" ? "default" : "secondary"}>
                    {scholarship.type}
                  </Badge>
                </TableCell>
                <TableCell>{scholarship.country}</TableCell>
                <TableCell>{scholarship.submittedApplications}</TableCell>
                <TableCell>
                  <Badge variant={scholarship.status === "Open" ? "default" : "secondary"}>
                    {scholarship.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenDialog(scholarship)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleStatus(scholarship.id)}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleVisibility(scholarship.id)}
                    >
                      {scholarship.isVisible ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(scholarship.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingScholarship ? "Edit Scholarship" : "Create Scholarship"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Scholarship Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter scholarship name"
                />
              </div>
              <div>
                <Label>Sponsor Name</Label>
                <Input
                  value={formData.sponsor}
                  onChange={(e) => setFormData({ ...formData, sponsor: e.target.value })}
                  placeholder="Enter sponsor name"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Scholarship Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: "Full" | "Partial") =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full">Full</SelectItem>
                    <SelectItem value="Partial">Partial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Country</Label>
                <Input
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="Enter country"
                />
              </div>
            </div>

            <div>
              <Label>Allowed Programs</Label>
              <div className="flex gap-4 mt-2">
                {["Bachelor", "Master", "PhD"].map((program) => (
                  <div key={program} className="flex items-center gap-2">
                    <Checkbox
                      checked={formData.allowedPrograms.includes(program)}
                      onCheckedChange={() => toggleProgram(program)}
                    />
                    <Label>{program}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Total Beneficiaries</Label>
                <Input
                  type="number"
                  value={formData.totalBeneficiaries}
                  onChange={(e) =>
                    setFormData({ ...formData, totalBeneficiaries: parseInt(e.target.value) || 0 })
                  }
                />
              </div>
              <div>
                <Label>Opening Date</Label>
                <Input
                  type="date"
                  value={formData.openingDate}
                  onChange={(e) => setFormData({ ...formData, openingDate: e.target.value })}
                />
              </div>
              <div>
                <Label>Closing Date</Label>
                <Input
                  type="date"
                  value={formData.closingDate}
                  onChange={(e) => setFormData({ ...formData, closingDate: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <ReactQuill
                theme="snow"
                value={formData.description}
                onChange={(value) => setFormData({ ...formData, description: value })}
                className="bg-background"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingScholarship ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Scholarships;
