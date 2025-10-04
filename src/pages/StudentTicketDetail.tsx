import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
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
  subject: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: Date;
  messages: Message[];
};

const mockTicket: Ticket = {
  id: "1",
  subject: "Issue with scholarship application",
  status: "in-progress",
  priority: "high",
  createdAt: new Date("2024-01-20"),
  messages: [
    {
      id: "1",
      sender: "student",
      senderName: "You",
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
      senderName: "You",
      content: "I'm trying to upload a PDF file that's about 8MB. It's my academic transcript.",
      timestamp: new Date("2024-01-20T15:45:00"),
    },
  ],
};

const StudentTicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<Ticket>(mockTicket);
  const [replyMessage, setReplyMessage] = useState("");

  const handleSendReply = () => {
    if (!replyMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "student",
      senderName: "You",
      content: replyMessage,
      timestamp: new Date(),
    };

    setTicket({
      ...ticket,
      messages: [...ticket.messages, newMessage],
    });
    setReplyMessage("");
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
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/student/tickets")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tickets
        </Button>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-2xl font-bold text-foreground">
                  {ticket.subject}
                </h1>
                <div className="flex gap-2">
                  {getStatusBadge(ticket.status)}
                  {getPriorityBadge(ticket.priority)}
                </div>
              </div>
              <p className="text-muted-foreground">
                Ticket #{ticket.id} • Created {format(ticket.createdAt, "MMM dd, yyyy")}
              </p>
            </CardContent>
          </Card>

          {/* Messages */}
          <div className="space-y-4">
            {ticket.messages.map((message) => (
              <Card
                key={message.id}
                className={message.sender === "admin" ? "ml-8" : "mr-8"}
              >
                <CardContent className="pt-6">
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
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Reply Form */}
          {ticket.status !== "closed" && (
            <Card>
              <CardContent className="pt-6">
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
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentTicketDetail;
