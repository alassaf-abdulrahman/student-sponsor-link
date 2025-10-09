import { useState } from "react";
import { StudentHeader } from "@/components/StudentHeader";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { FileText, Plus, Calendar, Upload } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const mockRequests = [
  {
    id: "REQ001",
    type: "Financial Support",
    description: "Request for additional funding for books",
    status: "Pending",
    submittedDate: new Date("2024-10-01"),
  },
  {
    id: "REQ002",
    type: "Academic Support",
    description: "Request for extension on assignment deadline",
    status: "Approved",
    submittedDate: new Date("2024-09-15"),
  },
  {
    id: "REQ003",
    type: "Document Request",
    description: "Need verification letter for internship",
    status: "Meeting Requested",
    submittedDate: new Date("2024-10-05"),
  },
];

const requestTypes = [
  "Financial Support",
  "Academic Support",
  "Document Request",
  "Extension Request",
  "Other"
];

const StudentRequests = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [description, setDescription] = useState("");
  const [documents, setDocuments] = useState<File[]>([]);

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

  const handleSubmitRequest = () => {
    if (!selectedType || !description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Submit request logic here
    toast({
      title: "Request Submitted",
      description: "Your request has been submitted successfully",
    });
    setIsDialogOpen(false);
    setSelectedType("");
    setDescription("");
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
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Requests</h1>
            <p className="text-muted-foreground">
              View and manage your support requests
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Submit New Request</DialogTitle>
                <DialogDescription>
                  Fill in the details for your request
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="request-type">Request Type</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger id="request-type">
                      <SelectValue placeholder="Select request type" />
                    </SelectTrigger>
                    <SelectContent>
                      {requestTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your request in detail..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="documents">Supporting Documents (Optional)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="documents"
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="flex-1"
                    />
                    <Upload className="h-4 w-4 text-muted-foreground" />
                  </div>
                  {documents.length > 0 && (
                    <p className="text-sm text-muted-foreground">
                      {documents.length} file(s) selected
                    </p>
                  )}
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitRequest}>
                  Submit Request
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {mockRequests.map((request) => (
            <Card key={request.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/student/requests/${request.id}`)}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl">{request.id}</CardTitle>
                      <Badge variant={getStatusVariant(request.status)}>
                        {request.status}
                      </Badge>
                    </div>
                    <CardDescription>{request.type}</CardDescription>
                  </div>
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{request.description}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Submitted: {format(request.submittedDate, "MMM dd, yyyy")}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {mockRequests.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No requests found</p>
          </Card>
        )}
      </main>
    </div>
  );
};

export default StudentRequests;
