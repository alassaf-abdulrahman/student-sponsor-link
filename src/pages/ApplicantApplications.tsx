import { ApplicantHeader } from "@/components/ApplicantHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for applicant's applications
const applications = [
  {
    id: "APP001",
    scholarshipName: "Full Academic Scholarship",
    country: "USA",
    university: "MIT",
    status: "First Approval",
    submittedDate: "2025-01-15",
    lastUpdate: "2025-01-20",
  },
  {
    id: "APP002",
    scholarshipName: "Engineering Excellence",
    country: "UK",
    university: "University of Oxford",
    status: "Under Review",
    submittedDate: "2025-01-10",
    lastUpdate: "2025-01-12",
  },
  {
    id: "APP003",
    scholarshipName: "Research Fellowship",
    country: "Canada",
    university: "University of Toronto",
    status: "Rejected",
    submittedDate: "2024-12-20",
    lastUpdate: "2025-01-05",
  },
];

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "First Approval":
    case "Second Approval":
      return "default";
    case "Under Review":
      return "secondary";
    case "Rejected":
      return "destructive";
    default:
      return "outline";
  }
};

const ApplicantApplications = () => {
  const navigate = useNavigate();

  const handleViewDetails = (id: string) => {
    navigate(`/applicant/scholarships/${id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <ApplicantHeader />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            My Applications
          </h1>
          <p className="text-muted-foreground">
            Track the status of your scholarship applications
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Applications ({applications.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application ID</TableHead>
                  <TableHead>Scholarship</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>University</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted Date</TableHead>
                  <TableHead>Last Update</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.id}</TableCell>
                    <TableCell>{app.scholarshipName}</TableCell>
                    <TableCell>{app.country}</TableCell>
                    <TableCell>{app.university}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(app.status)}>
                        {app.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{app.submittedDate}</TableCell>
                    <TableCell>{app.lastUpdate}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(app.id)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ApplicantApplications;
