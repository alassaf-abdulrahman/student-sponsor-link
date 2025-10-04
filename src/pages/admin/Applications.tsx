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
import { Eye, CheckCircle, XCircle, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Static data
const applications = [
  {
    id: "APP001",
    name: "Ahmed Hassan",
    nationality: "Egypt",
    studyType: "Bachelor",
    country: "USA",
    university: "MIT",
    status: "pending",
    appliedDate: "2025-01-15",
  },
  {
    id: "APP002",
    name: "Fatima Al-Sayed",
    nationality: "Saudi Arabia",
    studyType: "Master",
    country: "UK",
    university: "Oxford",
    status: "pending",
    appliedDate: "2025-01-14",
  },
  {
    id: "APP003",
    name: "Omar Khalil",
    nationality: "Jordan",
    studyType: "PhD",
    country: "Canada",
    university: "Toronto",
    status: "under_review",
    appliedDate: "2025-01-13",
  },
  {
    id: "APP004",
    name: "Layla Ibrahim",
    nationality: "Lebanon",
    studyType: "Diploma",
    country: "Germany",
    university: "TU Munich",
    status: "pending",
    appliedDate: "2025-01-12",
  },
  {
    id: "APP005",
    name: "Youssef Mansour",
    nationality: "UAE",
    studyType: "Bachelor",
    country: "USA",
    university: "Stanford",
    status: "pending",
    appliedDate: "2025-01-11",
  },
];

const Applications = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [nationalityFilter, setNationalityFilter] = useState("all");
  const [studyTypeFilter, setStudyTypeFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");

  const filteredApplications = applications.filter((app) => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesNationality = nationalityFilter === "all" || app.nationality === nationalityFilter;
    const matchesStudyType = studyTypeFilter === "all" || app.studyType === studyTypeFilter;
    const matchesCountry = countryFilter === "all" || app.country === countryFilter;

    return matchesSearch && matchesNationality && matchesStudyType && matchesCountry;
  });

  const handleApprove = (id: string) => {
    console.log("Approving application:", id);
    // TODO: Implement approval logic
  };

  const handleReject = (id: string) => {
    console.log("Rejecting application:", id);
    // TODO: Implement rejection logic
  };

  const handleView = (id: string) => {
    navigate(`/admin/applications/${id}`);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Applications</h1>
        <p className="text-muted-foreground">Manage scholarship applications</p>
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

          <Select value={nationalityFilter} onValueChange={setNationalityFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Nationality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Nationalities</SelectItem>
              <SelectItem value="Egypt">Egypt</SelectItem>
              <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
              <SelectItem value="Jordan">Jordan</SelectItem>
              <SelectItem value="Lebanon">Lebanon</SelectItem>
              <SelectItem value="UAE">UAE</SelectItem>
            </SelectContent>
          </Select>

          <Select value={studyTypeFilter} onValueChange={setStudyTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Study Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Study Types</SelectItem>
              <SelectItem value="Diploma">Diploma</SelectItem>
              <SelectItem value="Bachelor">Bachelor</SelectItem>
              <SelectItem value="Master">Master</SelectItem>
              <SelectItem value="PhD">PhD</SelectItem>
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
              <TableHead>Application ID</TableHead>
              <TableHead>Applicant Name</TableHead>
              <TableHead>Nationality</TableHead>
              <TableHead>Study Type</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>University</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applied Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplications.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-medium">{app.id}</TableCell>
                <TableCell>{app.name}</TableCell>
                <TableCell>{app.nationality}</TableCell>
                <TableCell>{app.studyType}</TableCell>
                <TableCell>{app.country}</TableCell>
                <TableCell>{app.university}</TableCell>
                <TableCell>
                  <Badge variant={app.status === "pending" ? "secondary" : "default"}>
                    {app.status.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell>{app.appliedDate}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleView(app.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleApprove(app.id)}
                      className="text-green-600 hover:text-green-700 hover:bg-green-50"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReject(app.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <XCircle className="h-4 w-4" />
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

export default Applications;
