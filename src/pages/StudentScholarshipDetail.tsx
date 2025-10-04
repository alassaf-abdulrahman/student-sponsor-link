import { useParams, useNavigate } from "react-router-dom";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GraduationCap, MapPin, Calendar, DollarSign, FileText, ArrowLeft, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Mock data - same as in StudentScholarships
const mockScholarships = [
  {
    id: 1,
    name: "Full Academic Scholarship 2024",
    description: "Full tuition coverage for undergraduate programs in engineering and sciences",
    sponsor: "Tech Foundation",
    country: "United States",
    studyLevel: "Bachelor",
    deadline: "2024-12-31",
    status: "Open",
    coverage: "Full Tuition + Living Expenses",
    requirements: [
      "Minimum GPA of 3.5",
      "TOEFL score of 90+ or IELTS 7.0+",
      "Letter of recommendation from academic advisor",
      "Personal statement (500-1000 words)",
      "Proof of acceptance from accredited university"
    ],
    benefits: [
      "Full tuition coverage",
      "Monthly living stipend of $1,500",
      "Health insurance",
      "Travel allowance",
      "Book allowance"
    ]
  },
  {
    id: 2,
    name: "Graduate Research Grant",
    description: "Support for graduate students pursuing research in renewable energy",
    sponsor: "Green Energy Initiative",
    country: "Germany",
    studyLevel: "Master",
    deadline: "2024-11-15",
    status: "Open",
    coverage: "Full Tuition",
    requirements: [
      "Bachelor's degree in related field",
      "Minimum GPA of 3.0",
      "Research proposal",
      "German language proficiency (B2 level) or English proficiency"
    ],
    benefits: [
      "Full tuition waiver",
      "Research funding up to €5,000",
      "Conference attendance support"
    ]
  }
];

const StudentScholarshipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // In real app, fetch scholarship by id
  const scholarship = mockScholarships.find(s => s.id === parseInt(id || "0"));
  
  // Mock profile completion status
  const isProfileComplete = false;

  if (!scholarship) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto px-4 py-8">
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">Scholarship not found</p>
            <Button onClick={() => navigate("/student/scholarships")} className="mt-4">
              Back to Scholarships
            </Button>
          </Card>
        </main>
      </div>
    );
  }

  const handleApply = () => {
    if (!isProfileComplete) {
      navigate("/student/profile-completion");
    } else {
      // Navigate to application form
      console.log("Navigate to application form");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/student/scholarships")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Scholarships
        </Button>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-2">
                <Badge variant="secondary">{scholarship.status}</Badge>
                <Badge variant="outline">{scholarship.studyLevel}</Badge>
              </div>
            </div>
            <CardTitle className="text-3xl mb-2">{scholarship.name}</CardTitle>
            <CardDescription className="text-base">
              {scholarship.description}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 border rounded-lg">
                <GraduationCap className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Sponsor</p>
                  <p className="font-medium">{scholarship.sponsor}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 border rounded-lg">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Country</p>
                  <p className="font-medium">{scholarship.country}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 border rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Application Deadline</p>
                  <p className="font-medium">{scholarship.deadline}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 border rounded-lg">
                <DollarSign className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Coverage</p>
                  <p className="font-medium">{scholarship.coverage}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Requirements */}
            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Requirements
              </h3>
              <ul className="space-y-2">
                {scholarship.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Benefits */}
            <div>
              <h3 className="text-xl font-semibold mb-3">Benefits</h3>
              <ul className="space-y-2">
                {scholarship.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {!isProfileComplete && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  You need to complete your profile before applying for scholarships.
                  Click the button below to complete your profile.
                </AlertDescription>
              </Alert>
            )}

            <div className="flex gap-4">
              <Button onClick={handleApply} className="flex-1" size="lg">
                {isProfileComplete ? "Apply Now" : "Complete Profile to Apply"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default StudentScholarshipDetail;
