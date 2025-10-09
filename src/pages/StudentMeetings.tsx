import { StudentHeader } from "@/components/StudentHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

type Meeting = {
  id: string;
  title: string;
  date: string;
  time: string;
  link: string;
  status: "scheduled" | "completed" | "cancelled";
};

const mockMeetings: Meeting[] = [
  {
    id: "1",
    title: "Academic Progress Review",
    date: "2024-03-20",
    time: "10:00 AM - 11:00 AM",
    link: "https://meet.google.com/abc-defg-hij",
    status: "scheduled",
  },
  {
    id: "2",
    title: "Scholarship Committee Meeting",
    date: "2024-03-25",
    time: "2:00 PM - 3:00 PM",
    link: "https://zoom.us/j/123456789",
    status: "scheduled",
  },
];

const StudentMeetings = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "default";
      case "completed":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <StudentHeader />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            My Meetings
          </h1>
          <p className="text-muted-foreground">
            View all your scheduled meetings
          </p>
        </div>

        {mockMeetings.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No Scheduled Meetings
                </h3>
                <p className="text-muted-foreground">
                  You don't have any scheduled meetings at the moment.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockMeetings.map((meeting) => (
              <Card key={meeting.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl">{meeting.title}</CardTitle>
                    <Badge variant={getStatusColor(meeting.status)}>
                      {meeting.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{meeting.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{meeting.time}</span>
                  </div>
                  {meeting.status === "scheduled" && (
                    <Button 
                      className="w-full mt-4"
                      onClick={() => window.open(meeting.link, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Join Meeting
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentMeetings;
