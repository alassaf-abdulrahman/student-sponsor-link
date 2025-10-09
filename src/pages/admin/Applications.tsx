import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as XLSX from 'xlsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, CheckCircle, XCircle, Search, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

// Static data - Submitted applications
const submittedApplications = [
  {
    id: "APP001",
    name: "Ahmed Hassan",
    scholarship: "Full Academic Scholarship",
    country: "USA",
    nationality: "Egypt",
    cgpa: "3.8",
    programType: "Bachelor",
    appliedDate: "2025-01-15",
  },
  {
    id: "APP002",
    name: "Fatima Al-Sayed",
    scholarship: "Engineering Excellence",
    country: "UK",
    nationality: "Saudi Arabia",
    cgpa: "3.9",
    programType: "Master",
    appliedDate: "2025-01-14",
  },
  {
    id: "APP003",
    name: "Omar Khalil",
    scholarship: "Research Fellowship",
    country: "Canada",
    nationality: "Jordan",
    cgpa: "3.7",
    programType: "PhD",
    appliedDate: "2025-01-13",
  },
];

// First approval applications
const firstApprovalApplications = [
  {
    id: "APP006",
    name: "Layla Ibrahim",
    scholarship: "STEM Scholarship",
    cgpa: "3.85",
    programType: "Bachelor",
    meetingDate: "2025-02-10 10:00 AM",
    meetingCompleted: false,
  },
  {
    id: "APP007",
    name: "Youssef Mansour",
    scholarship: "Graduate Research Grant",
    cgpa: "3.92",
    programType: "Master",
    meetingDate: "Not Set",
    meetingCompleted: false,
  },
  {
    id: "APP008",
    name: "Sara Abdullah",
    scholarship: "PhD Excellence Award",
    cgpa: "3.88",
    programType: "PhD",
    meetingDate: "2025-02-08 02:00 PM",
    meetingCompleted: true,
  },
];

// Second approval applications
const secondApprovalApplications = [
  {
    id: "APP009",
    name: "Khaled Ahmed",
    scholarship: "Innovation Scholarship",
    comment: "Excellent academic record and strong research background. Recommended for full support.",
  },
  {
    id: "APP010",
    name: "Noor Hassan",
    scholarship: "Leadership Grant",
    comment: "Outstanding leadership skills demonstrated. Approved for tuition and living expenses.",
  },
];

const Applications = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [nationalityFilter, setNationalityFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");
  const [scholarshipFilter, setScholarshipFilter] = useState("all");
  const [programTypeFilter, setProgramTypeFilter] = useState("all");

  // Dialog states
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [finalApproveDialogOpen, setFinalApproveDialogOpen] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState("");
  const [comment, setComment] = useState("");
  const [editableScholarship, setEditableScholarship] = useState("");
  const [services, setServices] = useState({
    tuition: false,
    hostel: false,
    living: false,
  });

  const handleView = (id: string) => {
    navigate(`/admin/applications/${id}`);
  };

  const handleFirstApprove = (id: string) => {
    setSelectedAppId(id);
    setComment("");
    setApproveDialogOpen(true);
  };

  const confirmFirstApprove = () => {
    toast({
      title: "Application Approved",
      description: `Application ${selectedAppId} moved to first approval stage.`,
    });
    setApproveDialogOpen(false);
    setComment("");
  };

  const handleSecondApprove = (id: string) => {
    setSelectedAppId(id);
    setComment("");
    setApproveDialogOpen(true);
  };

  const confirmSecondApprove = () => {
    toast({
      title: "Application Approved",
      description: `Application ${selectedAppId} moved to second approval stage.`,
    });
    setApproveDialogOpen(false);
    setComment("");
  };

  const handleFinalApprove = (id: string, scholarship: string) => {
    setSelectedAppId(id);
    setEditableScholarship(scholarship);
    setServices({ tuition: false, hostel: false, living: false });
    setFinalApproveDialogOpen(true);
  };

  const confirmFinalApprove = () => {
    toast({
      title: "Final Approval",
      description: `Application ${selectedAppId} has been finally approved with selected services.`,
    });
    setFinalApproveDialogOpen(false);
  };

  const handleReject = (id: string) => {
    setSelectedAppId(id);
    setComment("");
    setRejectDialogOpen(true);
  };

  const confirmReject = () => {
    toast({
      title: "Application Rejected",
      description: `Application ${selectedAppId} has been rejected.`,
      variant: "destructive",
    });
    setRejectDialogOpen(false);
    setComment("");
  };

  const exportToExcel = () => {
    // Combine all applications
    const allApplications = [
      ...submittedApplications.map(app => ({
        ...app,
        stage: "Submitted",
      })),
      ...firstApprovalApplications.map(app => ({
        ...app,
        stage: "First Approval",
      })),
      ...secondApprovalApplications.map(app => ({
        ...app,
        stage: "Second Approval",
      })),
    ];

    const worksheet = XLSX.utils.json_to_sheet(allApplications);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");
    XLSX.writeFile(workbook, "scholarship_applications.xlsx");

    toast({
      title: "Success",
      description: "Applications exported to Excel successfully",
    });
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Applications</h1>
          <p className="text-muted-foreground">Manage scholarship applications through approval stages</p>
        </div>
        <Button onClick={exportToExcel} className="gap-2">
          <Download className="h-4 w-4" />
          Download as Excel
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-card p-4 rounded-lg border border-border mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Application Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Select value={nationalityFilter} onValueChange={setNationalityFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Nationality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Nationalities</SelectItem>
              <SelectItem value="Egypt">Egypt</SelectItem>
              <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
              <SelectItem value="Jordan">Jordan</SelectItem>
            </SelectContent>
          </Select>

          <Select value={countryFilter} onValueChange={setCountryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Study Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              <SelectItem value="USA">USA</SelectItem>
              <SelectItem value="UK">UK</SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
            </SelectContent>
          </Select>

          <Select value={scholarshipFilter} onValueChange={setScholarshipFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Scholarship" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Scholarships</SelectItem>
              <SelectItem value="Full Academic Scholarship">Full Academic</SelectItem>
              <SelectItem value="STEM Scholarship">STEM</SelectItem>
              <SelectItem value="Research Fellowship">Research</SelectItem>
            </SelectContent>
          </Select>

          <Select value={programTypeFilter} onValueChange={setProgramTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Program Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Programs</SelectItem>
              <SelectItem value="Bachelor">Bachelor</SelectItem>
              <SelectItem value="Master">Master</SelectItem>
              <SelectItem value="PhD">PhD</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="submitted" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="submitted">Submitted Applications</TabsTrigger>
          <TabsTrigger value="first-approval">First Approval</TabsTrigger>
          <TabsTrigger value="second-approval">Second Approval</TabsTrigger>
        </TabsList>

        {/* Submitted Applications Tab */}
        <TabsContent value="submitted">
          <div className="bg-card rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Scholarship</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Nationality</TableHead>
                  <TableHead>CGPA</TableHead>
                  <TableHead>Program Type</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submittedApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.name}</TableCell>
                    <TableCell>{app.scholarship}</TableCell>
                    <TableCell>{app.country}</TableCell>
                    <TableCell>{app.nationality}</TableCell>
                    <TableCell>{app.cgpa}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{app.programType}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(app.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFirstApprove(app.id)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          First Approve
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReject(app.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* First Approval Tab */}
        <TabsContent value="first-approval">
          <div className="bg-card rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Scholarship</TableHead>
                  <TableHead>CGPA</TableHead>
                  <TableHead>Program Type</TableHead>
                  <TableHead>Meeting Date</TableHead>
                  <TableHead>Meeting Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {firstApprovalApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.name}</TableCell>
                    <TableCell>{app.scholarship}</TableCell>
                    <TableCell>{app.cgpa}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{app.programType}</Badge>
                    </TableCell>
                    <TableCell>{app.meetingDate}</TableCell>
                    <TableCell>
                      <Badge variant={app.meetingCompleted ? "default" : "secondary"}>
                        {app.meetingCompleted ? "Completed" : "Not Completed"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(app.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSecondApprove(app.id)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Second Approve
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReject(app.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Second Approval Tab */}
        <TabsContent value="second-approval">
          <div className="bg-card rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Scholarship</TableHead>
                  <TableHead>Comment from Previous Approval</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {secondApprovalApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.name}</TableCell>
                    <TableCell>{app.scholarship}</TableCell>
                    <TableCell className="max-w-md">{app.comment}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(app.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFinalApprove(app.id, app.scholarship)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Final Approve
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReject(app.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* First/Second Approve Dialog */}
      <Dialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Application</DialogTitle>
            <DialogDescription>
              Add any comments for this approval (optional).
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="comment">Comment</Label>
              <Textarea
                id="comment"
                placeholder="Enter your comments here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setApproveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={selectedAppId.startsWith("APP00") ? confirmFirstApprove : confirmSecondApprove}>
              Confirm Approval
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Final Approve Dialog */}
      <Dialog open={finalApproveDialogOpen} onOpenChange={setFinalApproveDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Final Approval</DialogTitle>
            <DialogDescription>
              Review and finalize the scholarship details and services.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="scholarship">Scholarship</Label>
              <Input
                id="scholarship"
                value={editableScholarship}
                onChange={(e) => setEditableScholarship(e.target.value)}
              />
            </div>
            <div>
              <Label>Services Provided</Label>
              <div className="space-y-3 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="tuition"
                    checked={services.tuition}
                    onCheckedChange={(checked) =>
                      setServices({ ...services, tuition: checked as boolean })
                    }
                  />
                  <label htmlFor="tuition" className="text-sm font-medium leading-none">
                    Tuition Fees
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hostel"
                    checked={services.hostel}
                    onCheckedChange={(checked) =>
                      setServices({ ...services, hostel: checked as boolean })
                    }
                  />
                  <label htmlFor="hostel" className="text-sm font-medium leading-none">
                    Hostel
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="living"
                    checked={services.living}
                    onCheckedChange={(checked) =>
                      setServices({ ...services, living: checked as boolean })
                    }
                  />
                  <label htmlFor="living" className="text-sm font-medium leading-none">
                    Living Fees
                  </label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFinalApproveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmFinalApprove}>
              Confirm Final Approval
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Application</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejection.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="reject-comment">Reason</Label>
              <Textarea
                id="reject-comment"
                placeholder="Enter rejection reason..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmReject}>
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Applications;
