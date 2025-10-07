import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";

// Mock data for a complete application
const applicationData = {
  id: "APP001",
  status: "first_approval",
  appliedDate: "2025-01-15",
  
  // Personal Information
  personal: {
    nameEnglish: "Ahmed Hassan Mohamed",
    nameArabic: "أحمد حسن محمد",
    nationality: "Egypt",
    gender: "Male",
    dateOfBirth: "1998-05-15",
    placeOfBirth: "Cairo, Egypt",
    email: "ahmed.hassan@email.com",
    phone: "+20 123 456 7890",
    residenceCountry: "Egypt",
    passportNumber: "A12345678",
    passportExpiry: "2028-05-15",
    parentContactName: "Hassan Mohamed",
    parentContactNumber: "+20 123 456 7891",
  },

  // Academic Information
  academic: {
    lastQualification: "Master",
    secondary: {
      schoolName: "Cairo International School",
      yearOfGraduation: "2016",
      cgpa: "95%",
      languageOfStudy: "English",
      studiedInSaudi: true,
      qudoratPercentage: "88%",
      tahseeliPercentage: "92%",
    },
    bachelor: {
      country: "Egypt",
      university: "Cairo University",
      yearOfGraduation: "2020",
      cgpa: "3.8",
      cgpaOutOf: "4.0",
      language: "English",
      specialization: "Computer Science",
    },
    master: {
      country: "USA",
      university: "MIT",
      yearOfGraduation: "2023",
      cgpa: "3.9",
      cgpaOutOf: "4.0",
      language: "English",
      specialization: "Artificial Intelligence",
      studyMode: "Research",
      researchTitle: "Deep Learning Applications in Natural Language Processing",
    },
  },

  // Program Information
  program: {
    started: false,
    country: "UK",
    university: "University of Oxford",
    language: "English",
    specialization: "PhD in Machine Learning",
    yearlyTuition: "£25,000",
    studyPeriod: "4 years",
    numberOfSemesters: "8",
  },

  // Scholarship Applied For
  scholarship: {
    name: "Full Academic Scholarship",
    type: "Full Coverage",
    benefits: "Tuition, Living Expenses, Travel",
  },

  // Status Trail
  statusTrail: [
    {
      stage: "Submitted",
      date: "2025-01-15 10:30 AM",
      comment: "Application submitted successfully",
      status: "completed",
    },
    {
      stage: "First Approval",
      date: "2025-01-20 02:15 PM",
      comment: "Excellent academic record. Approved for interview.",
      status: "completed",
    },
    {
      stage: "Meeting Scheduled",
      date: "2025-01-25 10:00 AM",
      comment: "Interview scheduled with scholarship committee",
      status: "pending",
    },
    {
      stage: "Second Approval",
      date: "-",
      comment: "-",
      status: "pending",
    },
    {
      stage: "Final Approval",
      date: "-",
      comment: "-",
      status: "pending",
    },
  ],
};

const ApplicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/applications")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Applications
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Application {id}
            </h1>
            <p className="text-muted-foreground">
              {applicationData.personal.nameEnglish} - Applied on {applicationData.appliedDate}
            </p>
          </div>
          <Badge variant="default" className="text-base px-4 py-2">
            {applicationData.status.replace("_", " ").toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-6">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="academic">Academic Info</TabsTrigger>
          <TabsTrigger value="program">Program Details</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="scholarship">Scholarship</TabsTrigger>
          <TabsTrigger value="status">Status Trail</TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Name (English)</p>
                  <p className="font-medium">{applicationData.personal.nameEnglish}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Name (Arabic)</p>
                  <p className="font-medium">{applicationData.personal.nameArabic}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nationality</p>
                  <p className="font-medium">{applicationData.personal.nationality}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p className="font-medium">{applicationData.personal.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p className="font-medium">{applicationData.personal.dateOfBirth}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Place of Birth</p>
                  <p className="font-medium">{applicationData.personal.placeOfBirth}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{applicationData.personal.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{applicationData.personal.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Residence Country</p>
                  <p className="font-medium">{applicationData.personal.residenceCountry}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Passport Number</p>
                  <p className="font-medium">{applicationData.personal.passportNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Passport Expiry</p>
                  <p className="font-medium">{applicationData.personal.passportExpiry}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Parent Contact Name</p>
                  <p className="font-medium">{applicationData.personal.parentContactName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Parent Contact Number</p>
                  <p className="font-medium">{applicationData.personal.parentContactNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Academic Information Tab */}
        <TabsContent value="academic">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Secondary School</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">School Name</p>
                    <p className="font-medium">{applicationData.academic.secondary.schoolName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Year of Graduation</p>
                    <p className="font-medium">{applicationData.academic.secondary.yearOfGraduation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">CGPA</p>
                    <p className="font-medium">{applicationData.academic.secondary.cgpa}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Language of Study</p>
                    <p className="font-medium">{applicationData.academic.secondary.languageOfStudy}</p>
                  </div>
                  {applicationData.academic.secondary.studiedInSaudi && (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground">Qudorat Percentage</p>
                        <p className="font-medium">{applicationData.academic.secondary.qudoratPercentage}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Tahseeli Percentage</p>
                        <p className="font-medium">{applicationData.academic.secondary.tahseeliPercentage}</p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bachelor's Degree</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Country</p>
                    <p className="font-medium">{applicationData.academic.bachelor.country}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">University</p>
                    <p className="font-medium">{applicationData.academic.bachelor.university}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Year of Graduation</p>
                    <p className="font-medium">{applicationData.academic.bachelor.yearOfGraduation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">CGPA</p>
                    <p className="font-medium">{applicationData.academic.bachelor.cgpa} / {applicationData.academic.bachelor.cgpaOutOf}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Language</p>
                    <p className="font-medium">{applicationData.academic.bachelor.language}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Specialization</p>
                    <p className="font-medium">{applicationData.academic.bachelor.specialization}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Master's Degree</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Country</p>
                    <p className="font-medium">{applicationData.academic.master.country}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">University</p>
                    <p className="font-medium">{applicationData.academic.master.university}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Year of Graduation</p>
                    <p className="font-medium">{applicationData.academic.master.yearOfGraduation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">CGPA</p>
                    <p className="font-medium">{applicationData.academic.master.cgpa} / {applicationData.academic.master.cgpaOutOf}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Language</p>
                    <p className="font-medium">{applicationData.academic.master.language}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Specialization</p>
                    <p className="font-medium">{applicationData.academic.master.specialization}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Study Mode</p>
                    <p className="font-medium">{applicationData.academic.master.studyMode}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Research Title</p>
                    <p className="font-medium">{applicationData.academic.master.researchTitle}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Program Details Tab */}
        <TabsContent value="program">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Program Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Badge variant={applicationData.program.started ? "default" : "secondary"}>
                  {applicationData.program.started ? "Program Started" : "Program Not Yet Started"}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-6 mt-4">
                <div>
                  <p className="text-sm text-muted-foreground">Country of Study</p>
                  <p className="font-medium">{applicationData.program.country}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">University</p>
                  <p className="font-medium">{applicationData.program.university}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Language</p>
                  <p className="font-medium">{applicationData.program.language}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Specialization</p>
                  <p className="font-medium">{applicationData.program.specialization}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Yearly Tuition</p>
                  <p className="font-medium">{applicationData.program.yearlyTuition}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Study Period</p>
                  <p className="font-medium">{applicationData.program.studyPeriod}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Number of Semesters</p>
                  <p className="font-medium">{applicationData.program.numberOfSemesters}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <span className="font-medium">Passport</span>
                  <Button variant="outline" size="sm">View</Button>
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <span className="font-medium">Personal Image</span>
                  <Button variant="outline" size="sm">View</Button>
                </div>
                <Separator />
                <p className="text-sm font-semibold text-muted-foreground">Secondary School Documents</p>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <span className="font-medium">Graduation Certificate</span>
                  <Button variant="outline" size="sm">View</Button>
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <span className="font-medium">Transcript</span>
                  <Button variant="outline" size="sm">View</Button>
                </div>
                <Separator />
                <p className="text-sm font-semibold text-muted-foreground">Bachelor Documents</p>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <span className="font-medium">Graduation Certificate</span>
                  <Button variant="outline" size="sm">View</Button>
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <span className="font-medium">Transcript</span>
                  <Button variant="outline" size="sm">View</Button>
                </div>
                <Separator />
                <p className="text-sm font-semibold text-muted-foreground">Master Documents</p>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <span className="font-medium">Graduation Certificate</span>
                  <Button variant="outline" size="sm">View</Button>
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <span className="font-medium">Transcript</span>
                  <Button variant="outline" size="sm">View</Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <span className="font-medium">Qudorat Certificate</span>
                  <Button variant="outline" size="sm">View</Button>
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <span className="font-medium">Tahseeli Certificate</span>
                  <Button variant="outline" size="sm">View</Button>
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <span className="font-medium">Language Certificate</span>
                  <Button variant="outline" size="sm">View</Button>
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <span className="font-medium">Volunteering Certificates</span>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scholarship Tab */}
        <TabsContent value="scholarship">
          <Card>
            <CardHeader>
              <CardTitle>Scholarship Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Scholarship Name</p>
                  <p className="font-medium">{applicationData.scholarship.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium">{applicationData.scholarship.type}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Benefits</p>
                  <p className="font-medium">{applicationData.scholarship.benefits}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Status Trail Tab */}
        <TabsContent value="status">
          <Card>
            <CardHeader>
              <CardTitle>Application Status Trail</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {applicationData.statusTrail.map((stage, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      {stage.status === "completed" ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : (
                        <div className="h-6 w-6 rounded-full border-2 border-muted-foreground" />
                      )}
                      {index < applicationData.statusTrail.length - 1 && (
                        <div className={`w-0.5 h-16 ${stage.status === "completed" ? "bg-green-600" : "bg-muted"}`} />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold">{stage.stage}</h3>
                        <Badge variant={stage.status === "completed" ? "default" : "secondary"}>
                          {stage.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{stage.date}</p>
                      <p className="text-sm">{stage.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApplicationDetail;
