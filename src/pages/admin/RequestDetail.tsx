import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ArrowLeft, Calendar, FileText, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isChangeStatusOpen, setIsChangeStatusOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Mock data
  const request = {
    id: "REQ001",
    studentName: "Ahmed Hassan",
    email: "ahmed@example.com",
    university: "MIT",
    country: "USA",
    requestType: "Tuition",
    amount: "$12,000",
    cgpa: "3.8",
    status: "pending",
    semester: "Fall 2025",
    submittedDate: "2024-01-15",
    program: "Computer Science",
    studentId: "STU001",
    nationality: "Egypt",
    phoneNumber: "+1234567890",
    currentAddress: "123 Main St, Boston, MA",
    documents: [
      { name: "Transcript.pdf", uploadedDate: "2024-01-15" },
      { name: "Financial_Statement.pdf", uploadedDate: "2024-01-15" },
    ],
    statusHistory: [
      { status: "Pending", date: "2024-01-15", comment: "Request submitted by student" },
    ],
  };

  const handleChangeStatus = () => {
    if (!newStatus) {
      toast({
        title: "Error",
        description: "Please select a status",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Status Updated",
      description: `Request status changed to ${newStatus}`,
    });

    setIsChangeStatusOpen(false);
    setNewStatus("");
    setStatusMessage("");
    setUploadedFile(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "transferring":
        return "default";
      case "pending":
        return "secondary";
      case "in_progress":
        return "outline";
      case "rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="p-8">
      <Button
        variant="ghost"
        onClick={() => navigate("/admin/requests")}
        className="gap-2 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Requests
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Request Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Request Details</CardTitle>
                <Badge variant={getStatusColor(request.status)}>
                  {request.status.replace("_", " ")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Request ID</p>
                  <p className="font-medium">{request.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Request Type</p>
                  <p className="font-medium">{request.requestType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="font-semibold text-lg">{request.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Semester</p>
                  <p className="font-medium">{request.semester}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Submitted Date</p>
                  <p className="font-medium">{request.submittedDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Student Profile */}
          <Card>
            <CardHeader>
              <CardTitle>Student Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Student ID</p>
                  <p className="font-medium">{request.studentId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{request.studentName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{request.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{request.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nationality</p>
                  <p className="font-medium">{request.nationality}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">CGPA</p>
                  <p className="font-medium">{request.cgpa}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">University</p>
                  <p className="font-medium">{request.university}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Country</p>
                  <p className="font-medium">{request.country}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Program</p>
                  <p className="font-medium">{request.program}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{request.currentAddress}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attached Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Attached Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {request.documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border border-border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Uploaded: {doc.uploadedDate}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Status History */}
          <Card>
            <CardHeader>
              <CardTitle>Status Trail</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {request.statusHistory.map((history, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      {index < request.statusHistory.length - 1 && (
                        <div className="w-0.5 h-full bg-border mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={getStatusColor(history.status.toLowerCase())}>
                          {history.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {history.date}
                        </span>
                      </div>
                      {history.comment && (
                        <p className="text-sm text-muted-foreground">{history.comment}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => setIsChangeStatusOpen(true)}
                className="w-full"
              >
                Change Status
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Current Status</p>
                <Badge variant={getStatusColor(request.status)} className="mt-1">
                  {request.status.replace("_", " ")}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Documents</p>
                <p className="text-2xl font-bold">{request.documents.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Change Status Dialog */}
      <Dialog open={isChangeStatusOpen} onOpenChange={setIsChangeStatusOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Change Request Status</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="status">New Status *</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="request_additional_document">
                    Request Additional Document
                  </SelectItem>
                  <SelectItem value="request_meeting">Request Meeting</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="transferring">Transferring</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="message">Message / Notes</Label>
              <Textarea
                id="message"
                placeholder="Add any comments or notes about this status change..."
                value={statusMessage}
                onChange={(e) => setStatusMessage(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            <div>
              <Label htmlFor="file">Upload File (Optional)</Label>
              <div className="mt-2">
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileUpload}
                  className="cursor-pointer"
                />
                {uploadedFile && (
                  <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    {uploadedFile.name}
                  </p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsChangeStatusOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleChangeStatus}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RequestDetail;
