import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StudentHeader } from "@/components/StudentHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Mail, Users, ArrowLeft, Download, CheckCircle, XCircle, Upload } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const StudentProgramDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [excuseDialogOpen, setExcuseDialogOpen] = useState(false);
  const [excuseReason, setExcuseReason] = useState("");
  const [excuseDocument, setExcuseDocument] = useState<File | null>(null);

  // Mock data - set to pending to test excuse feature
  const program = {
    id: "1",
    title: "Leadership Workshop 2024",
    overview: "Develop essential leadership skills for your academic and professional journey. This comprehensive workshop covers team management, strategic thinking, and effective communication.",
    place: "University Main Hall",
    date: new Date("2024-03-15"),
    contentType: "Workshop",
    contactDetails: "events@scholarship.org",
    poster: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    enrolledCount: 45,
    isEnrolled: false,
    attendanceStatus: "pending",
    hasCertificate: false,
  };

  const handleGenerateCertificate = () => {
    toast({
      title: "Certificate Generated",
      description: "Your certificate has been generated and downloaded.",
    });
  };

  const handleEnroll = () => {
    toast({
      title: "Enrolled Successfully",
      description: "You have been enrolled in this program.",
    });
  };

  const handleExcuse = () => {
    if (!excuseReason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for excusing.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Excuse Submitted",
      description: "Your excuse has been submitted successfully.",
    });
    setExcuseDialogOpen(false);
    setExcuseReason("");
    setExcuseDocument(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setExcuseDocument(e.target.files[0]);
    }
  };

  const getAttendanceDisplay = () => {
    switch (program.attendanceStatus) {
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
          onClick={() => navigate("/student/programs")}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <p className="font-medium">{program.place}</p>
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

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Enrollment Status</CardTitle>
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
                    </div>

                    {program.hasCertificate && program.attendanceStatus === "confirmed" && (
                      <Button
                        onClick={handleGenerateCertificate}
                        className="w-full gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Generate Certificate
                      </Button>
                    )}

                    {!program.hasCertificate && program.attendanceStatus === "pending" && (
                      <div className="flex gap-2">
                        <Button
                          onClick={handleEnroll}
                          className="flex-1"
                        >
                          Enroll
                        </Button>
                        <Button
                          onClick={() => setExcuseDialogOpen(true)}
                          variant="outline"
                          className="flex-1"
                        >
                          Excuse
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Excuse Dialog */}
        <Dialog open={excuseDialogOpen} onOpenChange={setExcuseDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Excuse from Program</DialogTitle>
              <DialogDescription>
                Please provide a reason for excusing yourself from this program.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reason">Reason *</Label>
                <Textarea
                  id="reason"
                  placeholder="Explain why you need to excuse..."
                  value={excuseReason}
                  onChange={(e) => setExcuseReason(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="document">Supporting Document (Optional)</Label>
                <Input
                  id="document"
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                {excuseDocument && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {excuseDocument.name}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setExcuseDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleExcuse}>
                Submit Excuse
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default StudentProgramDetail;
