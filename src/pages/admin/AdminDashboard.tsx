import { KPICard } from "@/components/KPICard";
import { 
  FileText, 
  Users, 
  CheckCircle, 
  Clock, 
  CreditCard, 
  Building 
} from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Overview of system statistics
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <KPICard
          title="Applications"
          icon={FileText}
          color="academic"
          items={[
            { label: "Total", value: "156", status: "neutral" },
            { label: "Pending", value: "45", status: "warning" },
            { label: "Approved", value: "89", status: "success" },
            { label: "Rejected", value: "22", status: "danger" },
          ]}
        />

        <KPICard
          title="Students"
          icon={Users}
          color="development"
          items={[
            { label: "Active", value: "89", status: "success" },
            { label: "New This Month", value: "12", status: "neutral" },
            { label: "Graduated", value: "34", status: "neutral" },
          ]}
        />

        <KPICard
          title="Tuition Requests"
          icon={CreditCard}
          color="financial"
          items={[
            { label: "Pending", value: "23", status: "warning" },
            { label: "Processed", value: "67", status: "success" },
            { label: "Total Amount", value: "$234K", status: "neutral" },
          ]}
        />

        <KPICard
          title="Sponsors"
          icon={Building}
          color="documents"
          items={[
            { label: "Active", value: "15", status: "success" },
            { label: "Total Funded", value: "$1.2M", status: "neutral" },
            { label: "Scholarships", value: "42", status: "neutral" },
          ]}
        />

        <KPICard
          title="System Status"
          icon={CheckCircle}
          color="academic"
          items={[
            { label: "Uptime", value: "99.9%", status: "success" },
            { label: "Active Users", value: "234", status: "neutral" },
            { label: "Last Update", value: "2 mins ago", status: "neutral" },
          ]}
        />

        <KPICard
          title="Pending Actions"
          icon={Clock}
          color="financial"
          items={[
            { label: "Applications", value: "45", status: "warning" },
            { label: "Tuition Requests", value: "23", status: "warning" },
            { label: "Tickets", value: "8", status: "danger" },
          ]}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
