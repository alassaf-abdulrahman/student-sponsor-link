import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Users, Eye, CheckCircle, XCircle, Clock } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

type Opportunity = {
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
  volunteerHours?: number;
  hasCertificate?: boolean;
};

const mockOpportunities: Opportunity[] = [
  {
    id: "1",
    title: "Community Clean-Up Drive",
    overview: "Help maintain a clean and sustainable community environment",
    place: "Central Park",
    date: new Date("2024-03-20"),
    contentType: "Environmental",
    poster: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400",
    enrolledCount: 28,
    isEnrolled: true,
    attendanceStatus: "confirmed",
    volunteerHours: 4,
    hasCertificate: true,
  },
  {
    id: "2",
    title: "Educational Support Program",
    overview: "Tutor underprivileged students in various subjects",
    place: "Community Learning Center",
    date: new Date("2024-02-15"),
    contentType: "Education",
    poster: "https://images.unsplash.com/photo-1497375628476-a6b648a2b89c?w=400",
    enrolledCount: 15,
    isEnrolled: true,
    attendanceStatus: "not-confirmed",
    volunteerHours: 0,
    hasCertificate: false,
  },
  {
    id: "3",
    title: "Food Bank Support",
    overview: "Help distribute food to families in need",
    place: "City Food Bank",
    date: new Date("2024-04-10"),
    contentType: "Community Service",
    poster: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400",
    enrolledCount: 20,
    isEnrolled: true,
    attendanceStatus: "pending",
    volunteerHours: 0,
    hasCertificate: false,
  },
];

const StudentOpportunities = () => {
  const [opportunities] = useState<Opportunity[]>(mockOpportunities);
  const navigate = useNavigate();

  const upcomingOpportunities = opportunities.filter(o => o.date > new Date() && o.isEnrolled);
  const previousOpportunities = opportunities.filter(o => o.date <= new Date() && o.isEnrolled);

  const getAttendanceBadge = (status?: string, hours?: number) => {
    switch (status) {
      case "confirmed":
        return (
          <div className="flex items-center gap-2">
            <Badge className="gap-1">
              <CheckCircle className="h-3 w-3" />
              Attended
            </Badge>
            {hours && hours > 0 && (
              <Badge variant="secondary" className="gap-1">
                <Clock className="h-3 w-3" />
                {hours}h
              </Badge>
            )}
          </div>
        );
      case "not-confirmed":
        return (
          <Badge variant="destructive" className="gap-1">
            <XCircle className="h-3 w-3" />
            Not Attended
          </Badge>
        );
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return null;
    }
  };

  const OpportunityCard = ({ opportunity }: { opportunity: Opportunity }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="aspect-video relative">
        <img
          src={opportunity.poster}
          alt={opportunity.title}
          className="w-full h-full object-cover rounded-t-lg"
        />
        <Badge className="absolute top-4 right-4">{opportunity.contentType}</Badge>
      </div>
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="font-bold text-xl mb-2">{opportunity.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {opportunity.overview}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{format(opportunity.date, "MMMM dd, yyyy")}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{opportunity.place}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{opportunity.enrolledCount} volunteers</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          {getAttendanceBadge(opportunity.attendanceStatus, opportunity.volunteerHours)}
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/student/opportunities/${opportunity.id}`)}
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
      <div className="container mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Volunteering Opportunities</h1>
          <p className="text-muted-foreground mt-1">
            View your volunteering activities and track your hours
          </p>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingOpportunities.length})
            </TabsTrigger>
            <TabsTrigger value="previous">
              Previous ({previousOpportunities.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            {upcomingOpportunities.length === 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-center text-muted-foreground">
                    No upcoming opportunities
                  </CardTitle>
                </CardHeader>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingOpportunities.map((opportunity) => (
                  <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="previous" className="space-y-6">
            {previousOpportunities.length === 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-center text-muted-foreground">
                    No previous opportunities
                  </CardTitle>
                </CardHeader>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {previousOpportunities.map((opportunity) => (
                  <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentOpportunities;
