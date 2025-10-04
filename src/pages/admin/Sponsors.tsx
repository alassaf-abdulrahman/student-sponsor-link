import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Search } from "lucide-react";

const initialSponsors = [
  { 
    id: "1", 
    name: "Global Education Foundation", 
    email: "contact@gef.org", 
    country: "United States", 
    totalScholarships: 145,
    activeScholarships: 98,
    status: "active" 
  },
  { 
    id: "2", 
    name: "Tech Leaders Initiative", 
    email: "admin@techleaders.org", 
    country: "United Kingdom", 
    totalScholarships: 87,
    activeScholarships: 62,
    status: "active" 
  },
  { 
    id: "3", 
    name: "Future Scholars Trust", 
    email: "info@futurescholars.org", 
    country: "Canada", 
    totalScholarships: 123,
    activeScholarships: 89,
    status: "active" 
  },
];

const Sponsors = () => {
  const [sponsors, setSponsors] = useState(initialSponsors);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<any>(null);
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    password: "",
    country: "" 
  });

  const filteredSponsors = sponsors.filter((sponsor) =>
    sponsor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sponsor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sponsor.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    const newSponsor = {
      id: String(sponsors.length + 1),
      name: formData.name,
      email: formData.email,
      country: formData.country,
      totalScholarships: 0,
      activeScholarships: 0,
      status: "active",
    };
    setSponsors([...sponsors, newSponsor]);
    setFormData({ name: "", email: "", password: "", country: "" });
    setIsAddDialogOpen(false);
  };

  const handleEdit = (sponsor: any) => {
    setEditingSponsor(sponsor);
    setFormData({ 
      name: sponsor.name, 
      email: sponsor.email, 
      password: "",
      country: sponsor.country 
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    setSponsors(
      sponsors.map((s) =>
        s.id === editingSponsor.id
          ? { ...s, name: formData.name, email: formData.email, country: formData.country }
          : s
      )
    );
    setFormData({ name: "", email: "", password: "", country: "" });
    setIsEditDialogOpen(false);
    setEditingSponsor(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this sponsor?")) {
      setSponsors(sponsors.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Sponsors</h1>
        <p className="text-muted-foreground">Manage sponsor organizations and their credentials</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search sponsors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Sponsor
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card">
            <DialogHeader>
              <DialogTitle>Add New Sponsor</DialogTitle>
              <DialogDescription>
                Add a new sponsor organization with login credentials.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Organization Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Global Education Foundation"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contact@sponsor.org"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter password"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="e.g., United States"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdd}>Add Sponsor</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>Edit Sponsor</DialogTitle>
            <DialogDescription>
              Update sponsor information and credentials.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Organization Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-password">New Password (leave blank to keep current)</Label>
              <Input
                id="edit-password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter new password"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-country">Country</Label>
              <Input
                id="edit-country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="bg-card rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Organization Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Total Scholarships</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSponsors.map((sponsor) => (
              <TableRow key={sponsor.id}>
                <TableCell className="font-medium">{sponsor.name}</TableCell>
                <TableCell>{sponsor.email}</TableCell>
                <TableCell>{sponsor.country}</TableCell>
                <TableCell>{sponsor.totalScholarships}</TableCell>
                <TableCell>{sponsor.activeScholarships}</TableCell>
                <TableCell>
                  <Badge variant={sponsor.status === "active" ? "default" : "secondary"}>
                    {sponsor.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(sponsor)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(sponsor.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
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
    </div>
  );
};

export default Sponsors;
