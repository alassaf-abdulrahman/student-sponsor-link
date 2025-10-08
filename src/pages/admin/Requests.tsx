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
import { Search, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Static data
const requests = [
  {
    id: "REQ001",
    studentName: "Ahmed Hassan",
    university: "MIT",
    country: "USA",
    requestType: "Tuition",
    amount: "$12,000",
    cgpa: "3.8",
    status: "pending",
    semester: "Fall 2025",
  },
  {
    id: "REQ002",
    studentName: "Fatima Al-Sayed",
    university: "Oxford",
    country: "UK",
    requestType: "Hostel",
    amount: "£2,500",
    cgpa: "3.9",
    status: "in_progress",
    semester: "Fall 2025",
  },
  {
    id: "REQ003",
    studentName: "Omar Khalil",
    university: "Toronto",
    country: "Canada",
    requestType: "Living Fees",
    amount: "CAD 5,000",
    cgpa: "3.7",
    status: "pending",
    semester: "Fall 2025",
  },
  {
    id: "REQ004",
    studentName: "Layla Ibrahim",
    university: "TU Munich",
    country: "Germany",
    requestType: "Tuition",
    amount: "€8,000",
    cgpa: "3.6",
    status: "transferring",
    semester: "Fall 2025",
  },
  {
    id: "REQ005",
    studentName: "Youssef Mansour",
    university: "Stanford",
    country: "USA",
    requestType: "Tuition",
    amount: "$13,500",
    cgpa: "3.95",
    status: "rejected",
    semester: "Fall 2025",
  },
];

const Requests = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [requestTypeFilter, setRequestTypeFilter] = useState("all");
  const [universityFilter, setUniversityFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");

  const filteredRequests = requests.filter((req) => {
    const matchesSearch = 
      req.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || req.status === statusFilter;
    const matchesRequestType = requestTypeFilter === "all" || req.requestType === requestTypeFilter;
    const matchesUniversity = universityFilter === "all" || req.university === universityFilter;
    const matchesCountry = countryFilter === "all" || req.country === countryFilter;

    return matchesSearch && matchesStatus && matchesRequestType && matchesUniversity && matchesCountry;
  });

  const handleViewRequest = (id: string) => {
    navigate(`/admin/requests/${id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "transferring":
        return "default";
      case "pending":
        return "secondary";
      case "in_progress":
        return "outline";
      case "rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Requests</h1>
        <p className="text-muted-foreground">Manage student requests</p>
      </div>

      {/* Filters */}
      <div className="bg-card p-4 rounded-lg border border-border mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, university, or country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={requestTypeFilter} onValueChange={setRequestTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Request Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Tuition">Tuition</SelectItem>
              <SelectItem value="Hostel">Hostel</SelectItem>
              <SelectItem value="Living Fees">Living Fees</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="transferring">Transferring</SelectItem>
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
              <TableHead>Request Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>CGPA</TableHead>
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
                <TableCell>
                  <Badge variant="outline">{req.requestType}</Badge>
                </TableCell>
                <TableCell className="font-semibold">{req.amount}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-mono">
                    {req.cgpa}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(req.status)}>
                    {req.status.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewRequest(req.id)}
                    className="gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    View Request
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Requests;
