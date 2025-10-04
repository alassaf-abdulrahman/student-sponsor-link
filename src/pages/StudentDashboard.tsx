import { DashboardHeader } from "@/components/DashboardHeader";
import { KPICard } from "@/components/KPICard";
import { HealthScore } from "@/components/HealthScore";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { 
  GraduationCap, 
  DollarSign, 
  TrendingUp, 
  FileText,
  Megaphone
} from "lucide-react";

type Announcement = {
  id: string;
  title: string;
  content: string;
  publishDate: Date;
};

const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Scholarship Application Deadline Extended",
    content: "We are pleased to announce that the scholarship application deadline has been extended to March 31st.",
    publishDate: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "New Sponsor Partnership",
    content: "We have partnered with Tech Foundation to offer 10 new scholarships for computer science students.",
    publishDate: new Date("2024-01-20"),
  },
];

const StudentDashboard = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);

  const dismissAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, John!
          </h1>
          <p className="text-muted-foreground">
            Here's your scholarship journey overview
          </p>
        </div>

        {/* Announcements */}
        {announcements.length > 0 && (
          <div className="mb-8 space-y-4">
            {announcements.map((announcement) => (
              <Alert key={announcement.id} className="relative border-l-4 border-l-primary">
                <Megaphone className="h-4 w-4" />
                <AlertDescription className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="font-semibold text-foreground mb-1">
                      {announcement.title}
                    </div>
                    <div
                      className="text-sm text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: announcement.content }}
                    />
                    <div className="text-xs text-muted-foreground mt-2">
                      {format(announcement.publishDate, "MMM dd, yyyy")}
                    </div>
                  </div>
                  <button
                    onClick={() => dismissAnnouncement(announcement.id)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        {/* KPI Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
          {/* Academic KPI */}
          <KPICard
            title="Academic"
            icon={GraduationCap}
            color="academic"
            items={[
              { label: "CGPA", value: "3.25 / 4.0", status: "success" },
              { label: "Last Term", value: "3.10 (-0.15)", status: "warning" },
              { label: "Pass Rate", value: "85%", status: "success" },
              { label: "Warnings", value: "0", status: "neutral" },
            ]}
          />

          {/* Financial KPI */}
          <KPICard
            title="Financial"
            icon={DollarSign}
            color="financial"
            items={[
              { label: "Payments", value: "2 / 4", status: "warning" },
              { label: "KYC", value: "Verified", status: "success" },
              { label: "Tuition Cover", value: "100%", status: "success" },
            ]}
          />

          {/* Development KPI */}
          <KPICard
            title="Development"
            icon={TrendingUp}
            color="development"
            items={[
              { label: "Attendance", value: "75%", status: "success" },
              { label: "Volunteering", value: "30 hrs", status: "neutral" },
              { label: "Achievements", value: "2", status: "neutral" },
            ]}
          />

          {/* Documents KPI */}
          <KPICard
            title="Documents"
            icon={FileText}
            color="documents"
            items={[
              { label: "Completion", value: "100% (10/10)", status: "success" },
              { label: "Passport", value: "Valid", status: "success" },
              { label: "Health Form", value: "Uploaded", status: "success" },
            ]}
          />
        </div>

        {/* Health Score - Full Width */}
        <div className="max-w-md">
          <HealthScore score={78} maxScore={100} />
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
