import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BookOpen, Calendar, CheckCircle, Clock, AlertCircle, MessageSquare, GraduationCap } from "lucide-react";
import { format } from "date-fns";

type ApplicationStatus = "submitted" | "first-approval" | "approved" | "rejected";

const mockScholarships = [
  {
    id: 1,
    name: "Full Academic Scholarship 2024",
    sponsor: "Tech Foundation",
    country: "United States",
    deadline: "2024-12-31",
    status: "Open",
    coverage: "Full Tuition + Living"
  },
  {
    id: 2,
    name: "Graduate Research Grant",
    sponsor: "Green Energy Initiative",
    country: "Germany",
    deadline: "2024-11-15",
    status: "Open",
    coverage: "Full Tuition"
  }
];

const mockMeetingSlots = [
  { id: 1, date: new Date(2025, 9, 15), time: "09:30", meetingLink: "https://meet.google.com/abc", available: true },
  { id: 2, date: new Date(2025, 9, 15), time: "10:00", meetingLink: "https://meet.google.com/abc", available: true },
  { id: 3, date: new Date(2025, 9, 15), time: "11:00", meetingLink: "https://meet.google.com/abc", available: true },
  { id: 4, date: new Date(2025, 9, 16), time: "09:00", meetingLink: "https://meet.google.com/def", available: true },
  { id: 5, date: new Date(2025, 9, 16), time: "10:30", meetingLink: "https://meet.google.com/def", available: true },
];

const StudentHome = () => {
  const navigate = useNavigate();
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus>("first-approval");
  const [profileCompletion, setProfileCompletion] = useState(100);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const getStatusBadge = (status: ApplicationStatus) => {
    const variants = {
      submitted: { label: "Submitted", variant: "secondary" as const },
      "first-approval": { label: "First Approval - Meeting Required", variant: "default" as const },
      approved: { label: "Approved", variant: "default" as const },
      rejected: { label: "Rejected", variant: "destructive" as const }
    };
    return variants[status];
  };

  const statusBadge = getStatusBadge(applicationStatus);

  const handleSlotSelection = (slotId: number) => {
    setSelectedSlot(slotId);
    // In real app, save the selection
    console.log("Selected slot:", slotId);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8 space-y-6">
        {/* Application Status Banner */}
        <Card className="border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold">Application Status</h2>
                  <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                </div>
                <p className="text-muted-foreground">
                  {applicationStatus === "first-approval" 
                    ? "Congratulations! Please schedule a meeting to proceed."
                    : applicationStatus === "submitted"
                    ? "Your application is under review. We'll notify you soon."
                    : applicationStatus === "approved"
                    ? "Your application has been approved! Welcome to the program."
                    : "Your application was not approved at this time."}
                </p>
              </div>
              {applicationStatus === "first-approval" && (
                <CheckCircle className="h-16 w-16 text-primary" />
              )}
            </div>

            {profileCompletion < 100 && (
              <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="flex items-center justify-between">
                  <span>Complete your profile to apply for scholarships</span>
                  <Button size="sm" onClick={() => navigate("/student/profile-completion")}>
                    Complete Profile ({profileCompletion}%)
                  </Button>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="scholarships" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="scholarships">
              <GraduationCap className="h-4 w-4 mr-2" />
              Scholarships
            </TabsTrigger>
            <TabsTrigger value="support">
              <MessageSquare className="h-4 w-4 mr-2" />
              Support
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scholarships" className="space-y-6">
            {/* Meeting Slot Selection */}
            {applicationStatus === "first-approval" && (
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Schedule Your Meeting
                  </CardTitle>
                  <CardDescription>
                    Select an available time slot for your interview
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(
                      mockMeetingSlots.reduce((acc, slot) => {
                        const dateKey = format(slot.date, 'MMMM dd, yyyy');
                        if (!acc[dateKey]) acc[dateKey] = [];
                        acc[dateKey].push(slot);
                        return acc;
                      }, {} as Record<string, typeof mockMeetingSlots>)
                    ).map(([date, slots]) => (
                      <div key={date}>
                        <h4 className="font-semibold mb-3 text-sm text-muted-foreground">{date}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {slots.map((slot) => (
                            <Dialog key={slot.id}>
                              <DialogTrigger asChild>
                                <Button
                                  variant={selectedSlot === slot.id ? "default" : "outline"}
                                  className="justify-start"
                                  disabled={!slot.available}
                                >
                                  <Clock className="h-4 w-4 mr-2" />
                                  {slot.time}
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Confirm Meeting Slot</DialogTitle>
                                  <DialogDescription>
                                    {date} at {slot.time}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <Alert>
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>
                                      Meeting Link: <a href={slot.meetingLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">{slot.meetingLink}</a>
                                    </AlertDescription>
                                  </Alert>
                                  <Button className="w-full" onClick={() => handleSlotSelection(slot.id)}>
                                    Confirm Booking
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Available Scholarships */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Available Scholarships</h2>
              <div className="grid gap-6">
                {mockScholarships.map((scholarship) => (
                  <Card key={scholarship.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{scholarship.name}</CardTitle>
                          <CardDescription className="mt-2">
                            {scholarship.sponsor} • {scholarship.country}
                          </CardDescription>
                        </div>
                        <Badge variant="secondary">{scholarship.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">
                            Deadline: {scholarship.deadline}
                          </p>
                          <p className="text-sm font-medium">{scholarship.coverage}</p>
                        </div>
                        <Button onClick={() => navigate(`/student/scholarships/${scholarship.id}`)}>
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="support">
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
                <CardDescription>Contact our support team or create a ticket</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" onClick={() => navigate("/student/tickets")}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  View Support Tickets
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                  <p>Email: support@scholarships.com</p>
                  <p>Phone: +1 (555) 123-4567</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default StudentHome;
