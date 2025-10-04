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

// Static data
const initialCountries = [
  { id: "1", name: "United States", code: "US", universities: 45, status: "active" },
  { id: "2", name: "United Kingdom", code: "UK", universities: 32, status: "active" },
  { id: "3", name: "Canada", code: "CA", universities: 28, status: "active" },
  { id: "4", name: "Germany", code: "DE", universities: 23, status: "active" },
  { id: "5", name: "Australia", code: "AU", universities: 19, status: "active" },
];

const StudyingCountries = () => {
  const [countries, setCountries] = useState(initialCountries);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState<any>(null);
  const [formData, setFormData] = useState({ name: "", code: "" });

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    const newCountry = {
      id: String(countries.length + 1),
      name: formData.name,
      code: formData.code,
      universities: 0,
      status: "active",
    };
    setCountries([...countries, newCountry]);
    setFormData({ name: "", code: "" });
    setIsAddDialogOpen(false);
  };

  const handleEdit = (country: any) => {
    setEditingCountry(country);
    setFormData({ name: country.name, code: country.code });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    setCountries(
      countries.map((c) =>
        c.id === editingCountry.id
          ? { ...c, name: formData.name, code: formData.code }
          : c
      )
    );
    setFormData({ name: "", code: "" });
    setIsEditDialogOpen(false);
    setEditingCountry(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this country?")) {
      setCountries(countries.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Studying Countries</h1>
        <p className="text-muted-foreground">Manage countries available for study programs</p>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Country
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card">
            <DialogHeader>
              <DialogTitle>Add New Country</DialogTitle>
              <DialogDescription>
                Add a new country to the list of studying destinations.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Country Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., United States"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="code">Country Code</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g., US"
                  maxLength={2}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdd}>Add Country</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>Edit Country</DialogTitle>
            <DialogDescription>
              Update country information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Country Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-code">Country Code</Label>
              <Input
                id="edit-code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                maxLength={2}
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

      {/* Table */}
      <div className="bg-card rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Country Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Universities</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCountries.map((country) => (
              <TableRow key={country.id}>
                <TableCell className="font-medium">{country.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{country.code}</Badge>
                </TableCell>
                <TableCell>{country.universities}</TableCell>
                <TableCell>
                  <Badge variant={country.status === "active" ? "default" : "secondary"}>
                    {country.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(country)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(country.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
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

export default StudyingCountries;
