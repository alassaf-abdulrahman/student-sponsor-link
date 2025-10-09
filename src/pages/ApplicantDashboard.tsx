import { ApplicantHeader } from "@/components/ApplicantHeader";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GraduationCap, AlertCircle, MapPin, Calendar } from "lucide-react";

const mockScholarships = [
  {
    id: 1,
    name: "Full Academic Scholarship 2024",
    sponsor: "Tech Foundation",
    country: "United States",
    studyLevel: "Bachelor",
    deadline: "2024-12-31",
    status: "Open",
    coverage: "Full Tuition + Living Expenses"
  },
  {
    id: 2,
    name: "Graduate Research Grant",
    sponsor: "Green Energy Initiative",
    country: "Germany",
    studyLevel: "Master",
    deadline: "2024-11-15",
    status: "Open",
    coverage: "Full Tuition"
  },
  {
    id: 3,
    name: "Medical Sciences Scholarship",
    sponsor: "Health Care Foundation",
    country: "Canada",
    studyLevel: "Bachelor",
    deadline: "2024-10-30",
    status: "Open",
    coverage: "Full Tuition + Stipend"
  }
];

const ApplicantDashboard = () => {
  const navigate = useNavigate();
  const isProfileComplete = false; // Mock - fetch from backend
  const hasActiveApplication = false; // Mock - check if user has pending application

  return (
    <div className="min-h-screen bg-background">
      <ApplicantHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Available Scholarships</h1>
          <p className="text-muted-foreground">
            Browse and apply for scholarships that match your qualifications
          </p>
        </div>

        {!isProfileComplete && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>Complete your profile to apply for scholarships</span>
              <Button size="sm" onClick={() => navigate("/applicant/profile-completion")}>
                Complete Profile
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {hasActiveApplication && (
          <Alert className="mb-6 border-primary">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You have an active application pending. You cannot apply to another scholarship until this application is processed.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockScholarships.map((scholarship) => (
            <Card key={scholarship.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">{scholarship.status}</Badge>
                  <Badge variant="outline">{scholarship.studyLevel}</Badge>
                </div>
                <CardTitle className="text-xl">{scholarship.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  Full tuition coverage for undergraduate programs
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Sponsor:</span>
                    <span className="font-medium">{scholarship.sponsor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Country:</span>
                    <span className="font-medium">{scholarship.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Deadline:</span>
                    <span className="font-medium">{scholarship.deadline}</span>
                  </div>
                  <div className="pt-2">
                    <span className="text-xs text-muted-foreground">Coverage:</span>
                    <p className="text-sm font-medium">{scholarship.coverage}</p>
                  </div>
                </div>
                <Button 
                  className="w-full"
                  onClick={() => navigate(`/applicant/scholarships/${scholarship.id}`)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ApplicantDashboard;
