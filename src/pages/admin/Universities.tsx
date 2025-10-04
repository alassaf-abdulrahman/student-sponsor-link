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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const initialUniversities = [
  { id: "1", name: "Harvard University", country: "United States", city: "Cambridge", ranking: 1, status: "active", studentCount: 245 },
  { id: "2", name: "Stanford University", country: "United States", city: "Stanford", ranking: 3, status: "active", studentCount: 178 },
  { id: "3", name: "MIT", country: "United States", city: "Cambridge", ranking: 2, status: "active", studentCount: 203 },
  { id: "4", name: "Oxford University", country: "United Kingdom", city: "Oxford", ranking: 4, status: "active", studentCount: 156 },
  { id: "5", name: "Cambridge University", country: "United Kingdom", city: "Cambridge", ranking: 5, status: "active", studentCount: 189 },
];

const Universities = () => {
  const [universities, setUniversities] = useState(initialUniversities);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState<any>(null);
  const [formData, setFormData] = useState({ 
    name: "", 
    country: "", 
    city: "", 
    ranking: "" 
  });

  const filteredUniversities = universities.filter((university) =>
    university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    university.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    university.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    const newUniversity = {
      id: String(universities.length + 1),
      name: formData.name,
      country: formData.country,
      city: formData.city,
      ranking: parseInt(formData.ranking) || 0,
      status: "active",
      studentCount: 0,
    };
    setUniversities([...universities, newUniversity]);
    setFormData({ name: "", country: "", city: "", ranking: "" });
    setIsAddDialogOpen(false);
  };

  const handleEdit = (university: any) => {
    setEditingUniversity(university);
    setFormData({ 
      name: university.name, 
      country: university.country, 
      city: university.city,
      ranking: String(university.ranking)
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    setUniversities(
      universities.map((u) =>
        u.id === editingUniversity.id
          ? { 
              ...u, 
              name: formData.name, 
              country: formData.country,
              city: formData.city,
              ranking: parseInt(formData.ranking) || 0
            }
          : u
      )
    );
    setFormData({ name: "", country: "", city: "", ranking: "" });
    setIsEditDialogOpen(false);
    setEditingUniversity(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this university?")) {
      setUniversities(universities.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Universities</h1>
        <p className="text-muted-foreground">Manage universities in the scholarship system</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search universities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add University
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card">
            <DialogHeader>
              <DialogTitle>Add New University</DialogTitle>
              <DialogDescription>
                Add a new university to the system.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">University Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Harvard University"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Select
                  value={formData.country}
                  onValueChange={(value) => setFormData({ ...formData, country: value })}
                >
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="Germany">Germany</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g., Cambridge"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ranking">Ranking</Label>
                <Input
                  id="ranking"
                  type="number"
                  value={formData.ranking}
                  onChange={(e) => setFormData({ ...formData, ranking: e.target.value })}
                  placeholder="e.g., 1"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdd}>Add University</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>Edit University</DialogTitle>
            <DialogDescription>
              Update university information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">University Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-country">Country</Label>
              <Select
                value={formData.country}
                onValueChange={(value) => setFormData({ ...formData, country: value })}
              >
                <SelectTrigger id="edit-country">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="Germany">Germany</SelectItem>
                  <SelectItem value="Australia">Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-city">City</Label>
              <Input
                id="edit-city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-ranking">Ranking</Label>
              <Input
                id="edit-ranking"
                type="number"
                value={formData.ranking}
                onChange={(e) => setFormData({ ...formData, ranking: e.target.value })}
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
              <TableHead>University Name</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Ranking</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUniversities.map((university) => (
              <TableRow key={university.id}>
                <TableCell className="font-medium">{university.name}</TableCell>
                <TableCell>{university.country}</TableCell>
                <TableCell>{university.city}</TableCell>
                <TableCell>#{university.ranking}</TableCell>
                <TableCell>{university.studentCount}</TableCell>
                <TableCell>
                  <Badge variant={university.status === "active" ? "default" : "secondary"}>
                    {university.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(university)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(university.id)}
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

export default Universities;
