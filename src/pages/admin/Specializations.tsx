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

const initialSpecializations = [
  { id: "1", name: "Mechanical Engineering", faculty: "Engineering", code: "ME", studentCount: 34, status: "active" },
  { id: "2", name: "General Surgery", faculty: "Medicine", code: "GSUR", studentCount: 45, status: "active" },
  { id: "3", name: "Finance", faculty: "Business Administration", code: "FIN", studentCount: 28, status: "active" },
  { id: "4", name: "Artificial Intelligence", faculty: "Computer Science", code: "AI", studentCount: 67, status: "active" },
  { id: "5", name: "Corporate Law", faculty: "Law", code: "CLAW", studentCount: 32, status: "active" },
];

const Specializations = () => {
  const [specializations, setSpecializations] = useState(initialSpecializations);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingSpecialization, setEditingSpecialization] = useState<any>(null);
  const [formData, setFormData] = useState({ 
    name: "", 
    faculty: "", 
    code: "" 
  });

  const filteredSpecializations = specializations.filter((specialization) =>
    specialization.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    specialization.faculty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    specialization.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    const newSpecialization = {
      id: String(specializations.length + 1),
      name: formData.name,
      faculty: formData.faculty,
      code: formData.code,
      studentCount: 0,
      status: "active",
    };
    setSpecializations([...specializations, newSpecialization]);
    setFormData({ name: "", faculty: "", code: "" });
    setIsAddDialogOpen(false);
  };

  const handleEdit = (specialization: any) => {
    setEditingSpecialization(specialization);
    setFormData({ 
      name: specialization.name, 
      faculty: specialization.faculty, 
      code: specialization.code 
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    setSpecializations(
      specializations.map((s) =>
        s.id === editingSpecialization.id
          ? { ...s, name: formData.name, faculty: formData.faculty, code: formData.code }
          : s
      )
    );
    setFormData({ name: "", faculty: "", code: "" });
    setIsEditDialogOpen(false);
    setEditingSpecialization(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this specialization?")) {
      setSpecializations(specializations.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Specializations</h1>
        <p className="text-muted-foreground">Manage specializations within faculties</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search specializations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Specialization
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card">
            <DialogHeader>
              <DialogTitle>Add New Specialization</DialogTitle>
              <DialogDescription>
                Add a new specialization to a faculty.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Specialization Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Mechanical Engineering"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="faculty">Faculty</Label>
                <Select
                  value={formData.faculty}
                  onValueChange={(value) => setFormData({ ...formData, faculty: value })}
                >
                  <SelectTrigger id="faculty">
                    <SelectValue placeholder="Select faculty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Medicine">Medicine</SelectItem>
                    <SelectItem value="Business Administration">Business Administration</SelectItem>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Law">Law</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="code">Specialization Code</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g., ME"
                  maxLength={5}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdd}>Add Specialization</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>Edit Specialization</DialogTitle>
            <DialogDescription>
              Update specialization information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Specialization Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-faculty">Faculty</Label>
              <Select
                value={formData.faculty}
                onValueChange={(value) => setFormData({ ...formData, faculty: value })}
              >
                <SelectTrigger id="edit-faculty">
                  <SelectValue placeholder="Select faculty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Medicine">Medicine</SelectItem>
                  <SelectItem value="Business Administration">Business Administration</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Law">Law</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-code">Specialization Code</Label>
              <Input
                id="edit-code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                maxLength={5}
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
              <TableHead>Specialization Name</TableHead>
              <TableHead>Faculty</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSpecializations.map((specialization) => (
              <TableRow key={specialization.id}>
                <TableCell className="font-medium">{specialization.name}</TableCell>
                <TableCell>{specialization.faculty}</TableCell>
                <TableCell>
                  <Badge variant="outline">{specialization.code}</Badge>
                </TableCell>
                <TableCell>{specialization.studentCount}</TableCell>
                <TableCell>
                  <Badge variant={specialization.status === "active" ? "default" : "secondary"}>
                    {specialization.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(specialization)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(specialization.id)}
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

export default Specializations;
