import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, MapPin, Mail, Users, ArrowLeft, Award } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

type Student = {
  id: string;
  name: string;
  email: string;
  university: string;
  attended: boolean;
  volunteerHours: number;
};

const OpportunityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data
  const opportunity = {
    id: "1",
    title: "Community Clean-Up Drive",
    overview: "Help maintain a clean and sustainable community environment. Join us for a day of making a positive impact on our local parks and public spaces.",
    place: "Central Park",
    date: new Date("2024-03-20"),
    contentType: "Environmental",
    contactDetails: "volunteer@community.org",
    poster: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800",
    enrolledCount: 28,
    status: "upcoming",
  };

  const mockStudents: Student[] = [
    { id: "1", name: "John Doe", email: "john@example.com", university: "Harvard University", attended: true, volunteerHours: 4 },
    { id: "2", name: "Jane Smith", email: "jane@example.com", university: "MIT", attended: true, volunteerHours: 5 },
    { id: "3", name: "Mike Johnson", email: "mike@example.com", university: "Stanford University", attended: false, volunteerHours: 0 },
  ];

  const [students, setStudents] = useState(mockStudents);
  const [isAttendanceConfirmed, setIsAttendanceConfirmed] = useState(false);
  const [certificatesGenerated, setCertificatesGenerated] = useState(false);

  const toggleAttendance = (studentId: string) => {
    setStudents(students.map(student =>
      student.id === studentId
        ? { ...student, attended: !student.attended }
        : student
    ));
  };

  const updateVolunteerHours = (studentId: string, hours: number) => {
    setStudents(students.map(student =>
      student.id === studentId
        ? { ...student, volunteerHours: hours }
        : student
    ));
  };

  const handleConfirmAttendance = () => {
    setIsAttendanceConfirmed(true);
    toast({
      title: "Attendance Confirmed",
      description: "Volunteer attendance and hours have been recorded successfully.",
    });
  };

  const handleGenerateCertificates = () => {
    setCertificatesGenerated(true);
    toast({
      title: "Certificates Generated",
      description: "Certificates are now available for volunteers who attended.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate("/admin/opportunities")}
        className="gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Opportunities
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-0">
              <img
                src={opportunity.poster}
                alt={opportunity.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="p-6 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{opportunity.title}</h1>
                  <div className="flex items-center gap-3">
                    <Badge>{opportunity.contentType}</Badge>
                    <Badge variant="outline">{opportunity.status}</Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{opportunity.enrolledCount} volunteers</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Overview</h3>
                  <p className="text-muted-foreground">{opportunity.overview}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">{format(opportunity.date, "MMM dd, yyyy")}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{opportunity.place}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Contact</p>
                      <p className="font-medium">{opportunity.contactDetails}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Enrolled Volunteers</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Attended</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>University</TableHead>
                    <TableHead>Hours</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <Checkbox
                          checked={student.attended}
                          onCheckedChange={() => toggleAttendance(student.id)}
                          disabled={isAttendanceConfirmed}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.university}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          step="0.5"
                          value={student.volunteerHours}
                          onChange={(e) => updateVolunteerHours(student.id, parseFloat(e.target.value) || 0)}
                          disabled={isAttendanceConfirmed || !student.attended}
                          className="w-20"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Volunteers</p>
                <p className="text-2xl font-bold">{students.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Attended</p>
                <p className="text-2xl font-bold">{students.filter(s => s.attended).length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Hours</p>
                <p className="text-2xl font-bold">
                  {students.reduce((sum, s) => sum + s.volunteerHours, 0)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={handleConfirmAttendance}
                disabled={isAttendanceConfirmed}
                className="w-full"
              >
                {isAttendanceConfirmed ? "Attendance Confirmed" : "Confirm Attendance"}
              </Button>
              {isAttendanceConfirmed && (
                <Button
                  onClick={handleGenerateCertificates}
                  disabled={certificatesGenerated}
                  variant="outline"
                  className="w-full gap-2"
                >
                  <Award className="h-4 w-4" />
                  {certificatesGenerated ? "Certificates Generated" : "Generate Certificates"}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetail;
