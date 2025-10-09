import { useState } from "react";
import { StudentHeader } from "@/components/StudentHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Users, Eye, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

type Program = {
  id: string;
  title: string;
  overview: string;
  place: string;
  date: Date;
  contentType: string;
  poster: string;
  enrolledCount: number;
  isEnrolled: boolean;
  attendanceStatus?: "confirmed" | "not-confirmed" | "pending";
  hasCertificate?: boolean;
};

const mockPrograms: Program[] = [
  {
    id: "1",
    title: "Leadership Workshop 2024",
    overview: "Develop essential leadership skills",
    place: "University Main Hall",
    date: new Date("2024-03-15"),
    contentType: "Workshop",
    poster: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
    enrolledCount: 45,
    isEnrolled: true,
    attendanceStatus: "confirmed",
    hasCertificate: true,
  },
  {
    id: "2",
    title: "Career Development Seminar",
    overview: "Learn about career opportunities",
    place: "Conference Center",
    date: new Date("2024-02-28"),
    contentType: "Seminar",
    poster: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400",
    enrolledCount: 78,
    isEnrolled: true,
    attendanceStatus: "not-confirmed",
    hasCertificate: false,
  },
  {
    id: "3",
    title: "Future Skills Summit",
    overview: "Explore emerging skills and technologies",
    place: "Innovation Hub",
    date: new Date("2024-04-20"),
    contentType: "Summit",
    poster: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400",
    enrolledCount: 32,
    isEnrolled: true,
    attendanceStatus: "pending",
    hasCertificate: false,
  },
];

const StudentPrograms = () => {
  const [programs] = useState<Program[]>(mockPrograms);
  const navigate = useNavigate();

  const upcomingPrograms = programs.filter(p => p.date > new Date() && p.isEnrolled);
  const previousPrograms = programs.filter(p => p.date <= new Date() && p.isEnrolled);

  const getAttendanceBadge = (status?: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="gap-1"><CheckCircle className="h-3 w-3" />Attended</Badge>;
      case "not-confirmed":
        return <Badge variant="destructive" className="gap-1"><XCircle className="h-3 w-3" />Not Attended</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return null;
    }
  };

  const ProgramCard = ({ program }: { program: Program }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="aspect-video relative">
        <img
          src={program.poster}
          alt={program.title}
          className="w-full h-full object-cover rounded-t-lg"
        />
        <Badge className="absolute top-4 right-4">{program.contentType}</Badge>
      </div>
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="font-bold text-xl mb-2">{program.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {program.overview}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{format(program.date, "MMMM dd, yyyy")}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{program.place}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{program.enrolledCount} enrolled</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          {getAttendanceBadge(program.attendanceStatus)}
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/student/programs/${program.id}`)}
            className="gap-2"
          >
            <Eye className="h-4 w-4" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <StudentHeader />
      <div className="container mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Programs</h1>
          <p className="text-muted-foreground mt-1">
            View your enrolled programs and attendance status
          </p>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">
              Upcoming Programs ({upcomingPrograms.length})
            </TabsTrigger>
            <TabsTrigger value="previous">
              Previous Programs ({previousPrograms.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            {upcomingPrograms.length === 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-center text-muted-foreground">
                    No upcoming programs
                  </CardTitle>
                </CardHeader>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingPrograms.map((program) => (
                  <ProgramCard key={program.id} program={program} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="previous" className="space-y-6">
            {previousPrograms.length === 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-center text-muted-foreground">
                    No previous programs
                  </CardTitle>
                </CardHeader>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {previousPrograms.map((program) => (
                  <ProgramCard key={program.id} program={program} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentPrograms;
