import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Calendar, MapPin, Mail, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

type EnrolledStudent = {
  id: string;
  name: string;
  email: string;
  enrolledDate: Date;
  attended: boolean;
};

const mockProgram = {
  id: "1",
  title: "Leadership Workshop 2024",
  overview: "Develop essential leadership skills for your academic and professional journey. This comprehensive workshop covers team management, decision-making, communication, and strategic thinking.",
  place: "University Main Hall",
  date: new Date("2024-03-15"),
  contentType: "Workshop",
  contactDetails: "events@scholarship.org",
  poster: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
  status: "completed",
};

const mockEnrolledStudents: EnrolledStudent[] = [
  {
    id: "1",
    name: "Ahmed Hassan",
    email: "ahmed.hassan@email.com",
    enrolledDate: new Date("2024-02-10"),
    attended: false,
  },
  {
    id: "2",
    name: "Sarah Mohammed",
    email: "sarah.m@email.com",
    enrolledDate: new Date("2024-02-12"),
    attended: false,
  },
  {
    id: "3",
    name: "Omar Ali",
    email: "omar.ali@email.com",
    enrolledDate: new Date("2024-02-15"),
    attended: false,
  },
  {
    id: "4",
    name: "Fatima Ibrahim",
    email: "fatima.i@email.com",
    enrolledDate: new Date("2024-02-18"),
    attended: false,
  },
];

const ProgramDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [students, setStudents] = useState<EnrolledStudent[]>(mockEnrolledStudents);

  const toggleAttendance = (studentId: string) => {
    setStudents(
      students.map((student) =>
        student.id === studentId
          ? { ...student, attended: !student.attended }
          : student
      )
    );
  };

  const confirmAllAttendance = () => {
    const attendedCount = students.filter((s) => s.attended).length;
    toast({
      title: "Attendance Confirmed",
      description: `${attendedCount} out of ${students.length} students marked as attended`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "default";
      case "ongoing":
        return "secondary";
      case "completed":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/admin/programs")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Program Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{mockProgram.title}</CardTitle>
                <Badge variant={getStatusColor(mockProgram.status)} className="mt-2">
                  {mockProgram.status}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {mockProgram.poster && (
              <img
                src={mockProgram.poster}
                alt={mockProgram.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            )}

            <div>
              <h3 className="font-semibold text-lg mb-2">Overview</h3>
              <p className="text-muted-foreground">{mockProgram.overview}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{format(mockProgram.date, "MMMM dd, yyyy")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Place</p>
                  <p className="font-medium">{mockProgram.place}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Contact</p>
                  <p className="font-medium">{mockProgram.contactDetails}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline">{mockProgram.contentType}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Enrollment Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total Enrolled</span>
              <span className="text-2xl font-bold">{students.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Attended</span>
              <span className="text-2xl font-bold text-green-600">
                {students.filter((s) => s.attended).length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Attendance Rate</span>
              <span className="text-lg font-semibold">
                {students.length > 0
                  ? Math.round(
                      (students.filter((s) => s.attended).length / students.length) * 100
                    )
                  : 0}
                %
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enrolled Students */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Enrolled Students</CardTitle>
            {mockProgram.status === "completed" && (
              <Button onClick={confirmAllAttendance} className="gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Save Attendance
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Enrolled Date</TableHead>
                {mockProgram.status === "completed" && <TableHead>Attended</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{format(student.enrolledDate, "MMM dd, yyyy")}</TableCell>
                  {mockProgram.status === "completed" && (
                    <TableCell>
                      <Checkbox
                        checked={student.attended}
                        onCheckedChange={() => toggleAttendance(student.id)}
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgramDetail;
