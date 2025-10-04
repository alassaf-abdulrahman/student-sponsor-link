import { DashboardHeader } from "@/components/DashboardHeader";
import { KPICard } from "@/components/KPICard";
import { HealthScore } from "@/components/HealthScore";
import { 
  GraduationCap, 
  DollarSign, 
  TrendingUp, 
  FileText 
} from "lucide-react";

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Student Dashboard
          </h1>
          <p className="text-muted-foreground">
            Status & performance overview
          </p>
        </div>

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
