import { useParams, useNavigate } from "react-router-dom";
import { StudentHeader } from "@/components/StudentHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Mail, Users, ArrowLeft, Download, CheckCircle, XCircle, Clock } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const StudentOpportunityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data
  const opportunity = {
    id: "1",
    title: "Community Clean-Up Drive",
    overview: "Help maintain a clean and sustainable community environment. Join us for a day of making a positive impact on our local parks and public spaces. This is a great opportunity to give back to the community while meeting like-minded individuals.",
    place: "Central Park",
    date: new Date("2024-03-20"),
    contentType: "Environmental",
    contactDetails: "volunteer@community.org",
    poster: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800",
    enrolledCount: 28,
    isEnrolled: true,
    attendanceStatus: "confirmed",
    volunteerHours: 4,
    hasCertificate: true,
  };

  const handleGenerateCertificate = () => {
    toast({
      title: "Certificate Generated",
      description: "Your volunteering certificate has been generated and downloaded.",
    });
    // In real implementation, this would trigger certificate generation
  };

  const getAttendanceDisplay = () => {
    switch (opportunity.attendanceStatus) {
      case "confirmed":
        return (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">Attendance Confirmed</span>
          </div>
        );
      case "not-confirmed":
        return (
          <div className="flex items-center gap-2 text-destructive">
            <XCircle className="h-5 w-5" />
            <span className="font-medium">Attendance Not Confirmed</span>
          </div>
        );
      case "pending":
        return (
          <Badge variant="secondary" className="text-base px-4 py-2">
            Attendance Pending
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <StudentHeader />
      <div className="container mx-auto p-6 space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/student/opportunities")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Opportunities
        </Button>

        <Card>
          <CardContent className="p-0">
            <img
              src={opportunity.poster}
              alt={opportunity.title}
              className="w-full h-80 object-cover rounded-t-lg"
            />
            <div className="p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold">{opportunity.title}</h1>
                  <div className="flex items-center gap-3">
                    <Badge>{opportunity.contentType}</Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{opportunity.enrolledCount} volunteers</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Overview</h3>
                <p className="text-muted-foreground">{opportunity.overview}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Opportunity Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Date & Time</p>
                        <p className="font-medium">{format(opportunity.date, "MMMM dd, yyyy")}</p>
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
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Volunteering Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Enrollment</p>
                        <Badge className="text-base px-4 py-2">Enrolled</Badge>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Attendance</p>
                        {getAttendanceDisplay()}
                      </div>
                      {opportunity.volunteerHours && opportunity.volunteerHours > 0 && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Volunteer Hours</p>
                          <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-primary" />
                            <span className="text-2xl font-bold">{opportunity.volunteerHours}</span>
                            <span className="text-muted-foreground">hours</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {opportunity.hasCertificate && opportunity.attendanceStatus === "confirmed" && (
                      <Button
                        onClick={handleGenerateCertificate}
                        className="w-full gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Generate Certificate
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentOpportunityDetail;
