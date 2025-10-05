import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, TrendingUp, Award, AlertCircle, CheckCircle } from "lucide-react";

const SponsorDashboard = () => {
  // Mock KPI data
  const kpiData = {
    applicants: {
      total: 300,
      accepted: 120,
      acceptanceRate: 40,
      completedApps: 80
    },
    finance: {
      totalBudget: 1000000,
      disbursed: 450000,
      disbursedPercent: 45,
      remaining: 550000,
      claimsMatch: 98,
      delayed: 2.5
    },
    academic: {
      avgCGPA: 3.1,
      warnings: 15,
      warningsPercent: 12.5,
      retention: 95,
      atRisk: 10,
      atRiskPercent: 8.3,
      graduating: 20
    },
    distribution: {
      MY: 60,
      SA: 40,
      JO: 30,
      fields: {
        ENG: 50,
        CS: 40,
        MED: 30
      }
    },
    grantSuccess: {
      current: 82,
      total: 100
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Sponsor Dashboard</h1>
        <p className="text-muted-foreground">Overview of your sponsored students</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Applicants KPI */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applicants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="text-2xl font-bold">{kpiData.applicants.total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Accepted</span>
                <span className="text-lg font-semibold">{kpiData.applicants.accepted} ({kpiData.applicants.acceptanceRate}%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Completed Apps</span>
                <span className="text-lg font-semibold">{kpiData.applicants.completedApps}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Finance KPI */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Finance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Budget</span>
                <span className="text-2xl font-bold">${kpiData.finance.totalBudget / 1000000}M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Disbursed</span>
                <span className="text-lg font-semibold">${kpiData.finance.disbursed / 1000}k ({kpiData.finance.disbursedPercent}%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Remaining</span>
                <span className="text-lg font-semibold">${kpiData.finance.remaining / 1000}k</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Claims Match</span>
                <span className="text-lg font-semibold">{kpiData.finance.claimsMatch}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Delayed</span>
                <span className="text-lg font-semibold">{kpiData.finance.delayed}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Performance KPI */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Academic Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Avg CGPA</span>
                <span className="text-2xl font-bold">{kpiData.academic.avgCGPA}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Warnings</span>
                <span className="text-lg font-semibold flex items-center gap-1">
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                  {kpiData.academic.warnings} ({kpiData.academic.warningsPercent}%)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Retention</span>
                <span className="text-lg font-semibold flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  {kpiData.academic.retention}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">At Risk</span>
                <span className="text-lg font-semibold">{kpiData.academic.atRisk} ({kpiData.academic.atRiskPercent}%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Graduating</span>
                <span className="text-lg font-semibold">{kpiData.academic.graduating}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Distribution KPI */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Distribution</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">MY</span>
                <span className="text-2xl font-bold">{kpiData.distribution.MY}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">SA</span>
                <span className="text-lg font-semibold">{kpiData.distribution.SA}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">JO</span>
                <span className="text-lg font-semibold">{kpiData.distribution.JO}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Fields</span>
                <span className="text-lg font-semibold">ENG-{kpiData.distribution.fields.ENG}, CS-{kpiData.distribution.fields.CS}, MED-{kpiData.distribution.fields.MED}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grant Success Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Grant Success</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="font-medium">{kpiData.grantSuccess.current} / {kpiData.grantSuccess.total}</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-3">
              <div 
                className="bg-primary h-3 rounded-full transition-all"
                style={{ width: `${(kpiData.grantSuccess.current / kpiData.grantSuccess.total) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SponsorDashboard;
