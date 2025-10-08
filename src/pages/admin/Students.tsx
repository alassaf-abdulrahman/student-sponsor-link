import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock student data
const mockStudents = [
  {
    id: "STD001",
    name: "Ahmed Hassan",
    country: "Malaysia",
    university: "Multimedia University (MMU)",
    cgpa: "3.8",
    kpiStatus: "good",
    status: "Active",
    scholarship: "Full Academic Scholarship",
    programType: "Bachelor",
  },
  {
    id: "STD002",
    name: "Sarah Mohamed",
    country: "UK",
    university: "University of Oxford",
    cgpa: "3.2",
    kpiStatus: "average",
    status: "Active",
    scholarship: "Partial Scholarship",
    programType: "Master",
  },
  {
    id: "STD003",
    name: "Omar Ali",
    country: "USA",
    university: "MIT",
    cgpa: "2.8",
    kpiStatus: "poor",
    status: "Active",
    scholarship: "Full Academic Scholarship",
    programType: "PhD",
  },
  {
    id: "STD004",
    name: "Fatima Ibrahim",
    country: "Malaysia",
    university: "UNITEN",
    cgpa: "3.9",
    kpiStatus: "good",
    status: "Not Started",
    scholarship: "Full Academic Scholarship",
    programType: "Bachelor",
  },
  {
    id: "STD005",
    name: "Youssef Khalil",
    country: "Canada",
    university: "University of Toronto",
    cgpa: "3.5",
    kpiStatus: "good",
    status: "Graduated",
    scholarship: "Partial Scholarship",
    programType: "Master",
  },
];

const Students = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [universityFilter, setUniversityFilter] = useState("all");
  const [scholarshipFilter, setScholarshipFilter] = useState("all");
  const [programTypeFilter, setProgramTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [actionMessage, setActionMessage] = useState("");

  const handleViewStudent = (studentId: string) => {
    navigate(`/admin/students/${studentId}`);
  };

  const handleActionClick = (type: string) => {
    setActionType(type);
    setActionDialogOpen(true);
  };

  const handleSendAction = () => {
    toast({
      title: `${actionType} sent successfully`,
      description: "The notification has been sent to the selected students.",
    });
    setActionDialogOpen(false);
    setActionMessage("");
  };

  const getKpiStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-green-500";
      case "average":
        return "bg-yellow-500";
      case "poor":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getKpiStatusLabel = (status: string) => {
    switch (status) {
      case "good":
        return "Good Performance";
      case "average":
        return "Average Performance";
      case "poor":
        return "Poor Performance";
      default:
        return status;
    }
  };

  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = countryFilter === "all" || student.country === countryFilter;
    const matchesUniversity = universityFilter === "all" || student.university === universityFilter;
    const matchesScholarship = scholarshipFilter === "all" || student.scholarship === scholarshipFilter;
    const matchesProgramType = programTypeFilter === "all" || student.programType === programTypeFilter;
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;

    return (
      matchesSearch &&
      matchesCountry &&
      matchesUniversity &&
      matchesScholarship &&
      matchesProgramType &&
      matchesStatus
    );
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Students</h1>
            <p className="text-muted-foreground">Manage and monitor all students</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleActionClick("First Warning")}>
              First Warning
            </Button>
            <Button variant="outline" onClick={() => handleActionClick("Second Warning")}>
              Second Warning
            </Button>
            <Button variant="outline" onClick={() => handleActionClick("Suspension")}>
              Suspension
            </Button>
            <Button variant="outline" onClick={() => handleActionClick("Request Meeting")}>
              Request Meeting
            </Button>
          </div>
        </div>

        {/* Filters Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Search</label>
                <Input
                  placeholder="Search by name, ID, university, country..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Country</label>
                <Select value={countryFilter} onValueChange={setCountryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Countries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    <SelectItem value="Malaysia">Malaysia</SelectItem>
                    <SelectItem value="UK">UK</SelectItem>
                    <SelectItem value="USA">USA</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">University</label>
                <Select value={universityFilter} onValueChange={setUniversityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Universities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Universities</SelectItem>
                    <SelectItem value="Multimedia University (MMU)">MMU</SelectItem>
                    <SelectItem value="UNITEN">UNITEN</SelectItem>
                    <SelectItem value="University of Oxford">Oxford</SelectItem>
                    <SelectItem value="MIT">MIT</SelectItem>
                    <SelectItem value="University of Toronto">Toronto</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Scholarship</label>
                <Select value={scholarshipFilter} onValueChange={setScholarshipFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Scholarships" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Scholarships</SelectItem>
                    <SelectItem value="Full Academic Scholarship">Full Academic Scholarship</SelectItem>
                    <SelectItem value="Partial Scholarship">Partial Scholarship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Program Type</label>
                <Select value={programTypeFilter} onValueChange={setProgramTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Program Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Program Types</SelectItem>
                    <SelectItem value="Bachelor">Bachelor</SelectItem>
                    <SelectItem value="Master">Master</SelectItem>
                    <SelectItem value="PhD">PhD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                    <SelectItem value="Graduated">Graduated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Students ({filteredStudents.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>CGPA</TableHead>
                  <TableHead>KPI Status</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.country}</TableCell>
                    <TableCell>{student.cgpa}</TableCell>
                    <TableCell>
                      <Badge className={getKpiStatusColor(student.kpiStatus)}>
                        {getKpiStatusLabel(student.kpiStatus)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{student.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewStudent(student.id)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Action Dialog */}
      <Dialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send {actionType}</DialogTitle>
            <DialogDescription>
              Write a message to send to the selected students.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Type your message here..."
              value={actionMessage}
              onChange={(e) => setActionMessage(e.target.value)}
              rows={6}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendAction}>
              Confirm Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Students;
