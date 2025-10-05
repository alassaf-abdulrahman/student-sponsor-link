import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, GraduationCap, FileText, TrendingUp, Award } from "lucide-react";
import { HealthScore } from "@/components/HealthScore";

const mockStudent = {
  id: 1,
  name: "Ahmed Ali",
  email: "ahmed@email.com",
  phone: "+966501234567",
  nationality: "Saudi Arabian",
  dateOfBirth: "2000-05-15",
  currentProgram: {
    university: "King Saud University",
    country: "Saudi Arabia",
    specialization: "Computer Science",
    studyMode: "Bachelor",
    yearlyTuition: 25000,
    currentSemester: 6,
    cgpa: 3.8,
    cgpaOutOf: 4.0
  },
  previousQualifications: [
    {
      level: "Secondary School",
      schoolName: "Riyadh International School",
      yearOfGraduation: 2018,
      cgpa: 95,
      language: "English"
    }
  ],
  certificates: [
    { name: "Semester 5 Transcript", date: "2024-01-15", type: "Academic" },
    { name: "Volunteering - Food Bank", date: "2024-02-10", type: "Volunteering" },
    { name: "IELTS Certificate", date: "2023-06-20", type: "Language" }
  ],
  kpi: {
    academicScore: 85,
    attendanceScore: 92,
    engagementScore: 78,
    overallScore: 85
  }
};

const SponsorStudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-6xl">
      <Button
        variant="ghost"
        onClick={() => navigate("/sponsor/students")}
        className="mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Students
      </Button>

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{mockStudent.name}</h1>
          <p className="text-muted-foreground">{mockStudent.email}</p>
        </div>
        <Badge variant="default">Active Student</Badge>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="academic">Academic History</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="kpi">Performance KPI</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{mockStudent.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{mockStudent.phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Nationality</p>
                <p className="font-medium">{mockStudent.nationality}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date of Birth</p>
                <p className="font-medium">{mockStudent.dateOfBirth}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Current Program
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">University</p>
                  <p className="font-medium">{mockStudent.currentProgram.university}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Country</p>
                  <p className="font-medium">{mockStudent.currentProgram.country}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Specialization</p>
                  <p className="font-medium">{mockStudent.currentProgram.specialization}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Study Mode</p>
                  <p className="font-medium">{mockStudent.currentProgram.studyMode}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Semester</p>
                  <p className="font-medium">{mockStudent.currentProgram.currentSemester}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">CGPA</p>
                  <p className="font-medium">{mockStudent.currentProgram.cgpa} / {mockStudent.currentProgram.cgpaOutOf}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Yearly Tuition</p>
                  <p className="font-medium">${mockStudent.currentProgram.yearlyTuition.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Previous Qualifications</CardTitle>
              <CardDescription>Academic history before current program</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {mockStudent.previousQualifications.map((qual, index) => (
                <div key={index}>
                  {index > 0 && <Separator className="my-4" />}
                  <div>
                    <h3 className="font-semibold text-lg mb-3">{qual.level}</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Institution</p>
                        <p className="font-medium">{qual.schoolName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Year of Graduation</p>
                        <p className="font-medium">{qual.yearOfGraduation}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">CGPA/Grade</p>
                        <p className="font-medium">{qual.cgpa}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Language</p>
                        <p className="font-medium">{qual.language}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Uploaded Certificates
              </CardTitle>
              <CardDescription>Academic and volunteering certificates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockStudent.certificates.map((cert, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-medium">{cert.name}</p>
                        <p className="text-sm text-muted-foreground">{cert.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{cert.type}</Badge>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kpi" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Overall Health Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <HealthScore score={mockStudent.kpi.overallScore} maxScore={100} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Academic Score</span>
                    <span className="text-sm font-bold">{mockStudent.kpi.academicScore}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${mockStudent.kpi.academicScore}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Attendance Score</span>
                    <span className="text-sm font-bold">{mockStudent.kpi.attendanceScore}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${mockStudent.kpi.attendanceScore}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Engagement Score</span>
                    <span className="text-sm font-bold">{mockStudent.kpi.engagementScore}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${mockStudent.kpi.engagementScore}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SponsorStudentDetail;
