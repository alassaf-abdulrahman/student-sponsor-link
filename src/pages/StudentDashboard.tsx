import { DashboardHeader } from "@/components/DashboardHeader";
import { KPICard } from "@/components/KPICard";
import { HealthScore } from "@/components/HealthScore";
import { ProgramCard } from "@/components/ProgramCard";
import { ProgramDialog } from "@/components/ProgramDialog";
import { OpportunityCard } from "@/components/OpportunityCard";
import { OpportunityDialog } from "@/components/OpportunityDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X, Megaphone, GraduationCap, DollarSign, TrendingUp, FileText } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

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

type Program = {
  id: string;
  title: string;
  overview: string;
  place: string;
  date: Date;
  contentType: string;
  contactDetails: string;
  poster: string;
  enrolledCount: number;
};

const mockPrograms: Program[] = [
  {
    id: "1",
    title: "Leadership Workshop 2024",
    overview: "Develop essential leadership skills for your academic and professional journey",
    place: "University Main Hall",
    date: new Date("2024-03-15"),
    contentType: "Workshop",
    contactDetails: "events@scholarship.org",
    poster: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
    enrolledCount: 45,
  },
  {
    id: "2",
    title: "Career Development Seminar",
    overview: "Learn about career opportunities and professional development strategies",
    place: "Conference Center",
    date: new Date("2024-04-20"),
    contentType: "Seminar",
    contactDetails: "careers@scholarship.org",
    poster: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400",
    enrolledCount: 62,
  },
  {
    id: "3",
    title: "Community Service Initiative",
    overview: "Join us in giving back to the community through various volunteer activities",
    place: "City Community Center",
    date: new Date("2024-04-10"),
    contentType: "Volunteer",
    contactDetails: "volunteer@scholarship.org",
    poster: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400",
    enrolledCount: 32,
  },
];

const StudentDashboard = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isProgramDialogOpen, setIsProgramDialogOpen] = useState(false);
  const [enrolledPrograms, setEnrolledPrograms] = useState<string[]>([]);
  
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null);
  const [isOpportunityDialogOpen, setIsOpportunityDialogOpen] = useState(false);
  const [enrolledOpportunities, setEnrolledOpportunities] = useState<string[]>([]);

  const mockOpportunities = [
    {
      id: "1",
      title: "Community Clean-Up Drive",
      overview: "Help maintain a clean and sustainable community environment",
      place: "Central Park",
      date: new Date("2024-03-20"),
      contentType: "Environmental",
      contactDetails: "volunteer@community.org",
      poster: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400",
      enrolledCount: 28,
    },
    {
      id: "2",
      title: "Educational Support Program",
      overview: "Tutor underprivileged students in various subjects",
      place: "Community Learning Center",
      date: new Date("2024-04-05"),
      contentType: "Education",
      contactDetails: "education@volunteer.org",
      poster: "https://images.unsplash.com/photo-1497375628476-a6b648a2b89c?w=400",
      enrolledCount: 15,
    },
  ];

  const dismissAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
  };

  const handleViewProgramDetails = (programId: string) => {
    const program = mockPrograms.find((p) => p.id === programId);
    if (program) {
      setSelectedProgram(program);
      setIsProgramDialogOpen(true);
    }
  };

  const handleEnrollProgram = (programId: string) => {
    setEnrolledPrograms([...enrolledPrograms, programId]);
  };

  const handleViewOpportunityDetails = (opportunityId: string) => {
    const opportunity = mockOpportunities.find(o => o.id === opportunityId);
    setSelectedOpportunity(opportunity || null);
    setIsOpportunityDialogOpen(true);
  };

  const handleEnrollOpportunity = (opportunityId: string) => {
    setEnrolledOpportunities([...enrolledOpportunities, opportunityId]);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, John!
          </h1>
          <p className="text-muted-foreground">
            Here's your scholarship journey overview
          </p>
        </div>

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

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
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

        <div className="max-w-md mb-8">
          <HealthScore score={78} maxScore={100} />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Upcoming Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPrograms.map((program) => (
              <ProgramCard
                key={program.id}
                {...program}
                isEnrolled={enrolledPrograms.includes(program.id)}
                onViewDetails={handleViewProgramDetails}
              />
            ))}
          </div>
        </div>

        <ProgramDialog
          open={isProgramDialogOpen}
          onOpenChange={setIsProgramDialogOpen}
          program={selectedProgram}
          isEnrolled={selectedProgram ? enrolledPrograms.includes(selectedProgram.id) : false}
          onEnroll={handleEnrollProgram}
        />

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Volunteering Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockOpportunities.map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                {...opportunity}
                isEnrolled={enrolledOpportunities.includes(opportunity.id)}
                onViewDetails={handleViewOpportunityDetails}
              />
            ))}
          </div>
        </div>

        <OpportunityDialog
          open={isOpportunityDialogOpen}
          onOpenChange={setIsOpportunityDialogOpen}
          opportunity={selectedOpportunity}
          isEnrolled={selectedOpportunity ? enrolledOpportunities.includes(selectedOpportunity.id) : false}
          onEnroll={handleEnrollOpportunity}
        />
      </main>
    </div>
  );
};

export default StudentDashboard;
