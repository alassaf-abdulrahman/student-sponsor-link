import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Send } from "lucide-react";
import { format } from "date-fns";

type Message = {
  id: string;
  sender: "student" | "admin";
  senderName: string;
  content: string;
  timestamp: Date;
};

type Ticket = {
  id: string;
  studentName: string;
  subject: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: Date;
  messages: Message[];
};

const mockTicket: Ticket = {
  id: "1",
  studentName: "Ahmed Hassan",
  subject: "Issue with scholarship application",
  status: "open",
  priority: "high",
  createdAt: new Date("2024-01-20"),
  messages: [
    {
      id: "1",
      sender: "student",
      senderName: "Ahmed Hassan",
      content: "I'm having trouble submitting my scholarship application. The form keeps showing an error when I try to upload my documents.",
      timestamp: new Date("2024-01-20T10:30:00"),
    },
    {
      id: "2",
      sender: "admin",
      senderName: "Admin Support",
      content: "Thank you for reaching out. Can you please tell me which document format you're trying to upload? We support PDF, JPG, and PNG files up to 10MB.",
      timestamp: new Date("2024-01-20T14:15:00"),
    },
    {
      id: "3",
      sender: "student",
      senderName: "Ahmed Hassan",
      content: "I'm trying to upload a PDF file that's about 8MB. It's my academic transcript.",
      timestamp: new Date("2024-01-20T15:45:00"),
    },
  ],
};

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<Ticket>(mockTicket);
  const [replyMessage, setReplyMessage] = useState("");

  const handleSendReply = () => {
    if (!replyMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "admin",
      senderName: "Admin Support",
      content: replyMessage,
      timestamp: new Date(),
    };

    setTicket({
      ...ticket,
      messages: [...ticket.messages, newMessage],
    });
    setReplyMessage("");
  };

  const handleStatusChange = (status: Ticket["status"]) => {
    setTicket({ ...ticket, status });
  };

  const getStatusBadge = (status: Ticket["status"]) => {
    switch (status) {
      case "open":
        return <Badge className="bg-blue-500">Open</Badge>;
      case "in-progress":
        return <Badge className="bg-yellow-500">In Progress</Badge>;
      case "resolved":
        return <Badge className="bg-green-500">Resolved</Badge>;
      case "closed":
        return <Badge variant="secondary">Closed</Badge>;
    }
  };

  const getPriorityBadge = (priority: Ticket["priority"]) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge className="bg-orange-500">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
    }
  };

  return (
    <div className="p-8">
      <Button
        variant="ghost"
        onClick={() => navigate("/admin/tickets")}
        className="mb-6 gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Tickets
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  {ticket.subject}
                </h1>
                <p className="text-muted-foreground">
                  Ticket #{ticket.id} • Opened by {ticket.studentName}
                </p>
              </div>
              <div className="flex gap-2">
                {getStatusBadge(ticket.status)}
                {getPriorityBadge(ticket.priority)}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="space-y-4">
            {ticket.messages.map((message) => (
              <div
                key={message.id}
                className={`bg-card rounded-lg border border-border p-4 ${
                  message.sender === "admin" ? "ml-8" : "mr-8"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-semibold text-foreground">
                      {message.senderName}
                    </span>
                    <Badge variant="outline" className="ml-2">
                      {message.sender === "admin" ? "Admin" : "Student"}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {format(message.timestamp, "MMM dd, yyyy HH:mm")}
                  </span>
                </div>
                <p className="text-foreground">{message.content}</p>
              </div>
            ))}
          </div>

          {/* Reply Form */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Send Reply</h3>
            <Textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Type your reply here..."
              className="mb-4 min-h-[120px]"
            />
            <div className="flex justify-end">
              <Button onClick={handleSendReply} className="gap-2">
                <Send className="h-4 w-4" />
                Send Reply
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Ticket Status</h3>
            <Select value={ticket.status} onValueChange={handleStatusChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Ticket Info</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-muted-foreground">Created:</span>
                <p className="font-medium">
                  {format(ticket.createdAt, "MMM dd, yyyy HH:mm")}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Student:</span>
                <p className="font-medium">{ticket.studentName}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Priority:</span>
                <p className="font-medium capitalize">{ticket.priority}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
