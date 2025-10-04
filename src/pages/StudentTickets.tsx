import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { CreateTicketDialog } from "@/components/CreateTicketDialog";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

type Ticket = {
  id: string;
  subject: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: Date;
  updatedAt: Date;
  unreadReplies: number;
};

const mockTickets: Ticket[] = [
  {
    id: "1",
    subject: "Issue with scholarship application",
    status: "in-progress",
    priority: "high",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-21"),
    unreadReplies: 1,
  },
  {
    id: "2",
    subject: "Question about tuition fee request",
    status: "resolved",
    priority: "medium",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-18"),
    unreadReplies: 0,
  },
];

const StudentTickets = () => {
  const [tickets] = useState<Ticket[]>(mockTickets);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Support Tickets</h1>
            <p className="text-muted-foreground">
              View and manage your support requests
            </p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            New Ticket
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {tickets.map((ticket) => (
            <Card
              key={ticket.id}
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={() => navigate(`/student/tickets/${ticket.id}`)}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{ticket.subject}</CardTitle>
                    <CardDescription>
                      Ticket #{ticket.id} • Created{" "}
                      {format(ticket.createdAt, "MMM dd, yyyy")}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {getStatusBadge(ticket.status)}
                    {ticket.unreadReplies > 0 && (
                      <Badge variant="destructive">{ticket.unreadReplies} new</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Last updated: {format(ticket.updatedAt, "MMM dd, yyyy HH:mm")}
                </p>
              </CardContent>
            </Card>
          ))}

          {tickets.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">
                  You haven't created any support tickets yet
                </p>
                <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Your First Ticket
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <CreateTicketDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
};

export default StudentTickets;
