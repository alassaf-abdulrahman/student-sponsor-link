import { StudentHeader } from "@/components/StudentHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, User, CheckCircle } from "lucide-react";
import { format } from "date-fns";

type Notification = {
  id: string;
  type: "announcement" | "system";
  sender: "Admin" | "System";
  title: string;
  message: string;
  date: Date;
  read: boolean;
};

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "announcement",
    sender: "Admin",
    title: "Scholarship Application Deadline Extended",
    message: "We are pleased to announce that the scholarship application deadline has been extended to March 31st.",
    date: new Date("2024-03-10"),
    read: false,
  },
  {
    id: "2",
    type: "system",
    sender: "System",
    title: "Request Status Updated",
    message: "Your request status for Financial Support Request is now Under Review",
    date: new Date("2024-03-12"),
    read: false,
  },
  {
    id: "3",
    type: "announcement",
    sender: "Admin",
    title: "New Sponsor Partnership",
    message: "We have partnered with Tech Foundation to offer 10 new scholarships for computer science students.",
    date: new Date("2024-03-08"),
    read: true,
  },
  {
    id: "4",
    type: "system",
    sender: "System",
    title: "Request Status Updated",
    message: "Your request status for Document Verification is now Approved",
    date: new Date("2024-03-05"),
    read: true,
  },
];

const StudentNotifications = () => {
  return (
    <div className="min-h-screen bg-background">
      <StudentHeader />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Notifications
          </h1>
          <p className="text-muted-foreground">
            Stay updated with announcements and system notifications
          </p>
        </div>

        {mockNotifications.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No Notifications
                </h3>
                <p className="text-muted-foreground">
                  You don't have any notifications at the moment.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {mockNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`${!notification.read ? 'border-l-4 border-l-primary' : ''}`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`p-2 rounded-full ${
                        notification.type === 'announcement' 
                          ? 'bg-blue-500/10 text-blue-500' 
                          : 'bg-green-500/10 text-green-500'
                      }`}>
                        {notification.type === 'announcement' ? (
                          <Bell className="h-5 w-5" />
                        ) : (
                          <CheckCircle className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <Badge variant="default" className="text-xs">New</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <User className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {notification.sender}
                          </span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">
                            {format(notification.date, "MMM dd, yyyy 'at' h:mm a")}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentNotifications;
