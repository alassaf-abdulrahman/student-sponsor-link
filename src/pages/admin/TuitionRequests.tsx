import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Eye, CheckCircle, FileText, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Static data
const tuitionRequests = [
  {
    id: "TR001",
    studentName: "Ahmed Hassan",
    university: "MIT",
    country: "USA",
    amount: "$12,000",
    cgpa: "3.8",
    status: "pending",
    semester: "Fall 2025",
  },
  {
    id: "TR002",
    studentName: "Fatima Al-Sayed",
    university: "Oxford",
    country: "UK",
    amount: "£9,500",
    cgpa: "3.9",
    status: "under_review",
    semester: "Fall 2025",
  },
  {
    id: "TR003",
    studentName: "Omar Khalil",
    university: "Toronto",
    country: "Canada",
    amount: "CAD 15,000",
    cgpa: "3.7",
    status: "pending",
    semester: "Fall 2025",
  },
  {
    id: "TR004",
    studentName: "Layla Ibrahim",
    university: "TU Munich",
    country: "Germany",
    amount: "€8,000",
    cgpa: "3.6",
    status: "approved",
    semester: "Fall 2025",
  },
  {
    id: "TR005",
    studentName: "Youssef Mansour",
    university: "Stanford",
    country: "USA",
    amount: "$13,500",
    cgpa: "3.95",
    status: "pending",
    semester: "Fall 2025",
  },
];

const TuitionRequests = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [universityFilter, setUniversityFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");

  const filteredRequests = tuitionRequests.filter((req) => {
    const matchesSearch = req.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || req.status === statusFilter;
    const matchesUniversity = universityFilter === "all" || req.university === universityFilter;
    const matchesCountry = countryFilter === "all" || req.country === countryFilter;

    return matchesSearch && matchesStatus && matchesUniversity && matchesCountry;
  });

  const handleProcess = (id: string) => {
    console.log("Processing request:", id);
    // TODO: Implement process logic
  };

  const handleRequestDocuments = (id: string) => {
    console.log("Requesting additional documents:", id);
    // TODO: Implement request documents logic
  };

  const handleView = (id: string) => {
    navigate(`/admin/tuition-requests/${id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "default";
      case "pending":
        return "secondary";
      case "under_review":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Tuition Requests</h1>
        <p className="text-muted-foreground">Manage student tuition fee requests</p>
      </div>

      {/* Filters */}
      <div className="bg-card p-4 rounded-lg border border-border mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Select value={universityFilter} onValueChange={setUniversityFilter}>
            <SelectTrigger>
              <SelectValue placeholder="University" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Universities</SelectItem>
              <SelectItem value="MIT">MIT</SelectItem>
              <SelectItem value="Oxford">Oxford</SelectItem>
              <SelectItem value="Toronto">Toronto</SelectItem>
              <SelectItem value="TU Munich">TU Munich</SelectItem>
              <SelectItem value="Stanford">Stanford</SelectItem>
            </SelectContent>
          </Select>

          <Select value={countryFilter} onValueChange={setCountryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              <SelectItem value="USA">USA</SelectItem>
              <SelectItem value="UK">UK</SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
              <SelectItem value="Germany">Germany</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request ID</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>University</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>CGPA</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((req) => (
              <TableRow key={req.id}>
                <TableCell className="font-medium">{req.id}</TableCell>
                <TableCell>{req.studentName}</TableCell>
                <TableCell>{req.university}</TableCell>
                <TableCell>{req.country}</TableCell>
                <TableCell className="font-semibold">{req.amount}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-mono">
                    {req.cgpa}
                  </Badge>
                </TableCell>
                <TableCell>{req.semester}</TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(req.status)}>
                    {req.status.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleView(req.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleProcess(req.id)}
                      className="text-green-600 hover:text-green-700 hover:bg-green-50"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRequestDocuments(req.id)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <FileText className="h-4 w-4" />
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

export default TuitionRequests;
