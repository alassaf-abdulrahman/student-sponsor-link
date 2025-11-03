import { useState } from "react";
import { Search, Plus, Pencil, Trash2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Admin {
  id: string;
  name: string;
  email: string;
  isSuperAdmin: boolean;
  permissions: string[];
}

const availablePermissions = [
  "Applications",
  "Students",
  "Countries",
  "Universities",
  "Faculties",
  "Specializations",
  "Scholarships",
  "Requests",
  "Sponsors",
  "Tickets",
  "Announcements",
  "Programs",
  "Opportunities",
  "Data Analysis",
  "Meetings",
];

const Admins = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isSuperAdmin: false,
    permissions: [] as string[],
  });

  // Mock data
  const [admins, setAdmins] = useState<Admin[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      isSuperAdmin: true,
      permissions: availablePermissions,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      isSuperAdmin: false,
      permissions: ["Applications", "Students", "Tickets"],
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      isSuperAdmin: false,
      permissions: ["Scholarships", "Programs", "Opportunities"],
    },
  ]);

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      isSuperAdmin: false,
      permissions: [],
    });
  };

  const handleAddAdmin = () => {
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newAdmin: Admin = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      isSuperAdmin: formData.isSuperAdmin,
      permissions: formData.isSuperAdmin ? availablePermissions : formData.permissions,
    };

    setAdmins([...admins, newAdmin]);
    setIsAddDialogOpen(false);
    resetForm();
    toast.success("Admin added successfully");
  };

  const handleEditAdmin = () => {
    if (!selectedAdmin || !formData.name || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    setAdmins(
      admins.map((admin) =>
        admin.id === selectedAdmin.id
          ? {
              ...admin,
              name: formData.name,
              email: formData.email,
              isSuperAdmin: formData.isSuperAdmin,
              permissions: formData.isSuperAdmin ? availablePermissions : formData.permissions,
            }
          : admin
      )
    );
    setIsEditDialogOpen(false);
    setSelectedAdmin(null);
    resetForm();
    toast.success("Admin updated successfully");
  };

  const handleDeleteAdmin = () => {
    if (selectedAdmin) {
      setAdmins(admins.filter((admin) => admin.id !== selectedAdmin.id));
      setIsDeleteDialogOpen(false);
      setSelectedAdmin(null);
      toast.success("Admin deleted successfully");
    }
  };

  const openAddDialog = () => {
    resetForm();
    setIsAddDialogOpen(true);
  };

  const openEditDialog = (admin: Admin) => {
    setSelectedAdmin(admin);
    setFormData({
      name: admin.name,
      email: admin.email,
      password: "",
      isSuperAdmin: admin.isSuperAdmin,
      permissions: admin.permissions,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (admin: Admin) => {
    setSelectedAdmin(admin);
    setIsDeleteDialogOpen(true);
  };

  const handleSuperAdminChange = (checked: boolean) => {
    setFormData({
      ...formData,
      isSuperAdmin: checked,
      permissions: checked ? availablePermissions : [],
    });
  };

  const handlePermissionChange = (permission: string, checked: boolean) => {
    if (formData.isSuperAdmin) return; // Can't change permissions for super admin

    setFormData({
      ...formData,
      permissions: checked
        ? [...formData.permissions, permission]
        : formData.permissions.filter((p) => p !== permission),
    });
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage admin users and their permissions
          </p>
        </div>
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Admin
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search admins..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAdmins.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No admins found
                </TableCell>
              </TableRow>
            ) : (
              filteredAdmins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {admin.name}
                      {admin.isSuperAdmin && (
                        <Badge variant="default" className="gap-1">
                          <ShieldCheck className="h-3 w-3" />
                          Super Admin
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {admin.isSuperAdmin ? (
                        <Badge variant="secondary">All Permissions</Badge>
                      ) : (
                        admin.permissions.slice(0, 3).map((permission) => (
                          <Badge key={permission} variant="outline">
                            {permission}
                          </Badge>
                        ))
                      )}
                      {!admin.isSuperAdmin && admin.permissions.length > 3 && (
                        <Badge variant="outline">
                          +{admin.permissions.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(admin)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDeleteDialog(admin)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Admin Dialog */}
      <Dialog open={isAddDialogOpen || isEditDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setIsAddDialogOpen(false);
          setIsEditDialogOpen(false);
          setSelectedAdmin(null);
          resetForm();
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isAddDialogOpen ? "Add New Admin" : "Edit Admin"}
            </DialogTitle>
            <DialogDescription>
              {isAddDialogOpen
                ? "Create a new admin user and assign permissions"
                : "Update admin user details and permissions"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter admin name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email address"
              />
            </div>

            {isAddDialogOpen && (
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter password"
                />
              </div>
            )}

            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="superAdmin"
                  checked={formData.isSuperAdmin}
                  onCheckedChange={handleSuperAdminChange}
                />
                <Label
                  htmlFor="superAdmin"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Super Admin (All permissions)
                </Label>
              </div>

              <div className="space-y-2">
                <Label>Permissions</Label>
                <div className="grid grid-cols-2 gap-3 p-4 border rounded-md bg-muted/50">
                  {availablePermissions.map((permission) => (
                    <div key={permission} className="flex items-center space-x-2">
                      <Checkbox
                        id={permission}
                        checked={
                          formData.isSuperAdmin || formData.permissions.includes(permission)
                        }
                        onCheckedChange={(checked) =>
                          handlePermissionChange(permission, checked as boolean)
                        }
                        disabled={formData.isSuperAdmin}
                      />
                      <Label
                        htmlFor={permission}
                        className={`text-sm font-normal leading-none cursor-pointer ${
                          formData.isSuperAdmin ? "opacity-50" : ""
                        }`}
                      >
                        {permission}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddDialogOpen(false);
                setIsEditDialogOpen(false);
                setSelectedAdmin(null);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button onClick={isAddDialogOpen ? handleAddAdmin : handleEditAdmin}>
              {isAddDialogOpen ? "Add Admin" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the admin account for{" "}
              <span className="font-semibold">{selectedAdmin?.name}</span>. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedAdmin(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAdmin} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admins;
