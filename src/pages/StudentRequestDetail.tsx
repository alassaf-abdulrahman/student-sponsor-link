import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StudentHeader } from "@/components/StudentHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, FileText, MessageSquare, Clock, Upload } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const mockRequest = {
  id: "REQ001",
  type: "Financial Support",
  description: "Request for additional funding for books and materials needed for the upcoming semester.",
  status: "Meeting Requested",
  submittedDate: new Date("2024-10-01"),
  lastUpdated: new Date("2024-10-05"),
};

const mockStatusTrail = [
  {
    id: 1,
    status: "Submitted",
    date: new Date("2024-10-01"),
    comment: "Request submitted successfully",
  },
  {
    id: 2,
    status: "Under Review",
    date: new Date("2024-10-03"),
    comment: "Your request is being reviewed by the admin team",
  },
  {
    id: 3,
    status: "Meeting Requested",
    date: new Date("2024-10-05"),
    comment: "Please schedule a meeting to discuss your request in detail. Available slots have been provided.",
  },
];

const mockMeetingSlots = [
  { id: 1, date: new Date(2024, 9, 15), time: "09:30", available: true },
  { id: 2, date: new Date(2024, 9, 15), time: "11:00", available: true },
  { id: 3, date: new Date(2024, 9, 16), time: "10:00", available: true },
];

const StudentRequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedSlot, setSelectedSlot] = useState("");
  const [documents, setDocuments] = useState<File[]>([]);
  const [isMeetingDialogOpen, setIsMeetingDialogOpen] = useState(false);
  const [isDocumentDialogOpen, setIsDocumentDialogOpen] = useState(false);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Approved":
        return "default";
      case "Rejected":
        return "destructive";
      case "Meeting Requested":
      case "Additional Documents Requested":
        return "secondary";
      default:
        return "outline";
    }
  };

  const handleScheduleMeeting = () => {
    if (!selectedSlot) {
      toast({
        title: "Error",
        description: "Please select a meeting slot",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Meeting Scheduled",
      description: "Your meeting has been scheduled successfully",
    });
    setIsMeetingDialogOpen(false);
  };

  const handleUploadDocuments = () => {
    if (documents.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one document",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Documents Uploaded",
      description: "Your documents have been uploaded successfully",
    });
    setIsDocumentDialogOpen(false);
    setDocuments([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocuments(Array.from(e.target.files));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <StudentHeader />
      
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/student/requests")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Requests
        </Button>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-2xl">{mockRequest.id}</CardTitle>
                  <Badge variant={getStatusVariant(mockRequest.status)}>
                    {mockRequest.status}
                  </Badge>
                </div>
                <CardDescription className="text-base">{mockRequest.type}</CardDescription>
              </div>
              <FileText className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Submitted Date</p>
                <p className="font-medium">{format(mockRequest.submittedDate, "MMM dd, yyyy")}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Updated</p>
                <p className="font-medium">{format(mockRequest.lastUpdated, "MMM dd, yyyy")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="status-trail">Status Trail</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Request Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{mockRequest.description}</p>
              </CardContent>
            </Card>

            {mockRequest.status === "Meeting Requested" && (
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Meeting Required
                  </CardTitle>
                  <CardDescription>
                    Please schedule a meeting to discuss your request
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog open={isMeetingDialogOpen} onOpenChange={setIsMeetingDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Meeting
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Select Meeting Time</DialogTitle>
                        <DialogDescription>
                          Choose an available time slot
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <Label>Available Time Slots</Label>
                        <Select value={selectedSlot} onValueChange={setSelectedSlot}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a time slot" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockMeetingSlots.map((slot) => (
                              <SelectItem key={slot.id} value={slot.id.toString()}>
                                {format(slot.date, "MMM dd, yyyy")} at {slot.time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsMeetingDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleScheduleMeeting}>
                          Confirm
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            )}

            {mockRequest.status === "Additional Documents Requested" && (
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Additional Documents Required
                  </CardTitle>
                  <CardDescription>
                    Please upload the requested documents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog open={isDocumentDialogOpen} onOpenChange={setIsDocumentDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Documents
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Upload Documents</DialogTitle>
                        <DialogDescription>
                          Select the documents you want to upload
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="documents">Documents</Label>
                          <Input
                            id="documents"
                            type="file"
                            multiple
                            onChange={handleFileChange}
                          />
                          {documents.length > 0 && (
                            <p className="text-sm text-muted-foreground">
                              {documents.length} file(s) selected
                            </p>
                          )}
                        </div>
                      </div>

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDocumentDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleUploadDocuments}>
                          Upload
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="status-trail" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Status History</CardTitle>
                <CardDescription>Timeline of your request status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockStatusTrail.map((item, index) => (
                    <div key={item.id}>
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background">
                            <Clock className="h-4 w-4" />
                          </div>
                          {index < mockStatusTrail.length - 1 && (
                            <div className="h-full w-px bg-border mt-2" style={{ minHeight: "60px" }} />
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold">{item.status}</p>
                            <Badge variant="outline" className="text-xs">
                              {format(item.date, "MMM dd, yyyy")}
                            </Badge>
                          </div>
                          {item.comment && (
                            <div className="flex items-start gap-2 mt-2">
                              <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
                              <p className="text-sm text-muted-foreground">{item.comment}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default StudentRequestDetail;
