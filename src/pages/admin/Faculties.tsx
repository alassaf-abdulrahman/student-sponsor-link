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

const initialFaculties = [
  { id: "1", name: "Engineering", university: "Harvard University", code: "ENG", studentCount: 89, status: "active" },
  { id: "2", name: "Medicine", university: "Harvard University", code: "MED", studentCount: 124, status: "active" },
  { id: "3", name: "Business Administration", university: "Stanford University", code: "BUS", studentCount: 67, status: "active" },
  { id: "4", name: "Computer Science", university: "MIT", code: "CS", studentCount: 156, status: "active" },
  { id: "5", name: "Law", university: "Oxford University", code: "LAW", studentCount: 78, status: "active" },
];

const Faculties = () => {
  const [faculties, setFaculties] = useState(initialFaculties);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<any>(null);
  const [formData, setFormData] = useState({ 
    name: "", 
    university: "", 
    code: "" 
  });

  const filteredFaculties = faculties.filter((faculty) =>
    faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faculty.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faculty.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    const newFaculty = {
      id: String(faculties.length + 1),
      name: formData.name,
      university: formData.university,
      code: formData.code,
      studentCount: 0,
      status: "active",
    };
    setFaculties([...faculties, newFaculty]);
    setFormData({ name: "", university: "", code: "" });
    setIsAddDialogOpen(false);
  };

  const handleEdit = (faculty: any) => {
    setEditingFaculty(faculty);
    setFormData({ 
      name: faculty.name, 
      university: faculty.university, 
      code: faculty.code 
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    setFaculties(
      faculties.map((f) =>
        f.id === editingFaculty.id
          ? { ...f, name: formData.name, university: formData.university, code: formData.code }
          : f
      )
    );
    setFormData({ name: "", university: "", code: "" });
    setIsEditDialogOpen(false);
    setEditingFaculty(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this faculty?")) {
      setFaculties(faculties.filter((f) => f.id !== id));
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Faculties</h1>
        <p className="text-muted-foreground">Manage faculties across universities</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search faculties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Faculty
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card">
            <DialogHeader>
              <DialogTitle>Add New Faculty</DialogTitle>
              <DialogDescription>
                Add a new faculty to a university.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Faculty Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Engineering"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="university">University</Label>
                <Select
                  value={formData.university}
                  onValueChange={(value) => setFormData({ ...formData, university: value })}
                >
                  <SelectTrigger id="university">
                    <SelectValue placeholder="Select university" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Harvard University">Harvard University</SelectItem>
                    <SelectItem value="Stanford University">Stanford University</SelectItem>
                    <SelectItem value="MIT">MIT</SelectItem>
                    <SelectItem value="Oxford University">Oxford University</SelectItem>
                    <SelectItem value="Cambridge University">Cambridge University</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="code">Faculty Code</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g., ENG"
                  maxLength={5}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdd}>Add Faculty</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>Edit Faculty</DialogTitle>
            <DialogDescription>
              Update faculty information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Faculty Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-university">University</Label>
              <Select
                value={formData.university}
                onValueChange={(value) => setFormData({ ...formData, university: value })}
              >
                <SelectTrigger id="edit-university">
                  <SelectValue placeholder="Select university" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Harvard University">Harvard University</SelectItem>
                  <SelectItem value="Stanford University">Stanford University</SelectItem>
                  <SelectItem value="MIT">MIT</SelectItem>
                  <SelectItem value="Oxford University">Oxford University</SelectItem>
                  <SelectItem value="Cambridge University">Cambridge University</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-code">Faculty Code</Label>
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
              <TableHead>Faculty Name</TableHead>
              <TableHead>University</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFaculties.map((faculty) => (
              <TableRow key={faculty.id}>
                <TableCell className="font-medium">{faculty.name}</TableCell>
                <TableCell>{faculty.university}</TableCell>
                <TableCell>
                  <Badge variant="outline">{faculty.code}</Badge>
                </TableCell>
                <TableCell>{faculty.studentCount}</TableCell>
                <TableCell>
                  <Badge variant={faculty.status === "active" ? "default" : "secondary"}>
                    {faculty.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(faculty)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(faculty.id)}
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

export default Faculties;
