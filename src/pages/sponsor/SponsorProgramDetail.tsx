import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Mail, Users, ArrowLeft } from "lucide-react";
import { format } from "date-fns";

const SponsorProgramDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - matches the program from SponsorPrograms
  const program = {
    id: "1",
    title: "Leadership Workshop 2024",
    overview: "Develop essential leadership skills for your academic and professional journey. This comprehensive workshop covers team management, strategic thinking, and effective communication.",
    place: "University Main Hall",
    country: "USA",
    date: new Date("2024-03-15"),
    contentType: "Workshop",
    contactDetails: "events@scholarship.org",
    poster: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    enrolledCount: 45,
  };

  return (
    <div className="p-6 space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate("/sponsor/programs")}
        className="gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Programs
      </Button>

      <Card>
        <CardContent className="p-0">
          <img
            src={program.poster}
            alt={program.title}
            className="w-full h-80 object-cover rounded-t-lg"
          />
          <div className="p-6 space-y-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">{program.title}</h1>
                <div className="flex items-center gap-3">
                  <Badge>{program.contentType}</Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{program.enrolledCount} enrolled</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Overview</h3>
              <p className="text-muted-foreground">{program.overview}</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Program Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date & Time</p>
                    <p className="font-medium">{format(program.date, "MMMM dd, yyyy")}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{program.place}, {program.country}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Contact</p>
                    <p className="font-medium">{program.contactDetails}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SponsorProgramDetail;
