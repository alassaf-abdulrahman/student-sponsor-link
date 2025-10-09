import { StudentHeader } from "@/components/StudentHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle } from "lucide-react";

// Mock data for the student (this would come from auth/context in a real app)
const studentData = {
  id: "STD001",
  status: "Active",
  enrollmentDate: "2023-09-01",
  
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

  // Current Program Information
  program: {
    started: true,
    country: "UK",
    university: "University of Oxford",
    language: "English",
    specialization: "PhD in Machine Learning",
    yearlyTuition: "£25,000",
    studyPeriod: "4 years",
    numberOfSemesters: "8",
    currentSemester: "3",
    currentCGPA: "3.8",
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
      stage: "Enrolled",
      date: "2023-09-01 10:30 AM",
      comment: "Student successfully enrolled in the program",
      status: "completed",
    },
    {
      stage: "Semester 1 Completed",
      date: "2024-01-15 02:15 PM",
      comment: "Excellent performance in first semester",
      status: "completed",
    },
    {
      stage: "Semester 2 Completed",
      date: "2024-06-20 10:00 AM",
      comment: "Maintained good academic standing",
      status: "completed",
    },
  ],
};

const StudentProfile = () => {
  return (
    <div className="min-h-screen bg-background">
      <StudentHeader />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                My Profile
              </h1>
              <p className="text-muted-foreground">
                {studentData.personal.nameEnglish} - Enrolled on {studentData.enrollmentDate}
              </p>
            </div>
            <Badge variant="default" className="text-base px-4 py-2">
              {studentData.status}
            </Badge>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-6 h-auto">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="academic">Academic Info</TabsTrigger>
            <TabsTrigger value="program">Program Details</TabsTrigger>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Name (English)</p>
                    <p className="font-medium">{studentData.personal.nameEnglish}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Name (Arabic)</p>
                    <p className="font-medium">{studentData.personal.nameArabic}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Nationality</p>
                    <p className="font-medium">{studentData.personal.nationality}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Gender</p>
                    <p className="font-medium">{studentData.personal.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date of Birth</p>
                    <p className="font-medium">{studentData.personal.dateOfBirth}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Place of Birth</p>
                    <p className="font-medium">{studentData.personal.placeOfBirth}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{studentData.personal.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{studentData.personal.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Residence Country</p>
                    <p className="font-medium">{studentData.personal.residenceCountry}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Passport Number</p>
                    <p className="font-medium">{studentData.personal.passportNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Passport Expiry</p>
                    <p className="font-medium">{studentData.personal.passportExpiry}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Parent Contact Name</p>
                    <p className="font-medium">{studentData.personal.parentContactName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Parent Contact Number</p>
                    <p className="font-medium">{studentData.personal.parentContactNumber}</p>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground">School Name</p>
                      <p className="font-medium">{studentData.academic.secondary.schoolName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Year of Graduation</p>
                      <p className="font-medium">{studentData.academic.secondary.yearOfGraduation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">CGPA</p>
                      <p className="font-medium">{studentData.academic.secondary.cgpa}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Language of Study</p>
                      <p className="font-medium">{studentData.academic.secondary.languageOfStudy}</p>
                    </div>
                    {studentData.academic.secondary.studiedInSaudi && (
                      <>
                        <div>
                          <p className="text-sm text-muted-foreground">Qudorat Percentage</p>
                          <p className="font-medium">{studentData.academic.secondary.qudoratPercentage}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Tahseeli Percentage</p>
                          <p className="font-medium">{studentData.academic.secondary.tahseeliPercentage}</p>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Country</p>
                      <p className="font-medium">{studentData.academic.bachelor.country}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">University</p>
                      <p className="font-medium">{studentData.academic.bachelor.university}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Year of Graduation</p>
                      <p className="font-medium">{studentData.academic.bachelor.yearOfGraduation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">CGPA</p>
                      <p className="font-medium">{studentData.academic.bachelor.cgpa} / {studentData.academic.bachelor.cgpaOutOf}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Language</p>
                      <p className="font-medium">{studentData.academic.bachelor.language}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Specialization</p>
                      <p className="font-medium">{studentData.academic.bachelor.specialization}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Master's Degree</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Country</p>
                      <p className="font-medium">{studentData.academic.master.country}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">University</p>
                      <p className="font-medium">{studentData.academic.master.university}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Year of Graduation</p>
                      <p className="font-medium">{studentData.academic.master.yearOfGraduation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">CGPA</p>
                      <p className="font-medium">{studentData.academic.master.cgpa} / {studentData.academic.master.cgpaOutOf}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Language</p>
                      <p className="font-medium">{studentData.academic.master.language}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Specialization</p>
                      <p className="font-medium">{studentData.academic.master.specialization}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Study Mode</p>
                      <p className="font-medium">{studentData.academic.master.studyMode}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-muted-foreground">Research Title</p>
                      <p className="font-medium">{studentData.academic.master.researchTitle}</p>
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
                <CardTitle>Current Program Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Badge variant={studentData.program.started ? "default" : "secondary"}>
                    {studentData.program.started ? "Program Started" : "Program Not Yet Started"}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Country of Study</p>
                    <p className="font-medium">{studentData.program.country}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">University</p>
                    <p className="font-medium">{studentData.program.university}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Language</p>
                    <p className="font-medium">{studentData.program.language}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Specialization</p>
                    <p className="font-medium">{studentData.program.specialization}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Yearly Tuition</p>
                    <p className="font-medium">{studentData.program.yearlyTuition}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Study Period</p>
                    <p className="font-medium">{studentData.program.studyPeriod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Number of Semesters</p>
                    <p className="font-medium">{studentData.program.numberOfSemesters}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Semester</p>
                    <p className="font-medium">{studentData.program.currentSemester}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current CGPA</p>
                    <p className="font-medium">{studentData.program.currentCGPA}</p>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Scholarship Name</p>
                    <p className="font-medium">{studentData.scholarship.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="font-medium">{studentData.scholarship.type}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Benefits</p>
                    <p className="font-medium">{studentData.scholarship.benefits}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Status Trail Tab */}
          <TabsContent value="status">
            <Card>
              <CardHeader>
                <CardTitle>Journey Status Trail</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 md:space-y-6">
                  {studentData.statusTrail.map((stage, index) => (
                    <div key={index} className="flex gap-3 md:gap-4">
                      <div className="flex flex-col items-center">
                        {stage.status === "completed" ? (
                          <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-green-600 flex-shrink-0" />
                        ) : (
                          <div className="h-5 w-5 md:h-6 md:w-6 rounded-full border-2 border-muted-foreground flex-shrink-0" />
                        )}
                        {index < studentData.statusTrail.length - 1 && (
                          <div className={`w-0.5 h-12 md:h-16 ${stage.status === "completed" ? "bg-green-600" : "bg-muted"}`} />
                        )}
                      </div>
                      <div className="flex-1 pb-6 md:pb-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-1">
                          <h3 className="font-semibold text-sm md:text-base">{stage.stage}</h3>
                          <Badge variant={stage.status === "completed" ? "default" : "secondary"} className="w-fit">
                            {stage.status}
                          </Badge>
                        </div>
                        <p className="text-xs md:text-sm text-muted-foreground mb-1">{stage.date}</p>
                        <p className="text-xs md:text-sm">{stage.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default StudentProfile;
