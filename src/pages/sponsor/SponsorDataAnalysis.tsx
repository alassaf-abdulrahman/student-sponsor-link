import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Download, BarChart3 } from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useToast } from "@/hooks/use-toast";

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

type FilterOptions = {
  nationality: string;
  country: string;
  university: string;
};

// Mock data for sponsor's students only
const mockData = {
  studentsByNationality: [
    { name: "Egyptian", value: 45 },
    { name: "Saudi", value: 32 },
    { name: "Jordanian", value: 28 },
    { name: "Iraqi", value: 18 },
  ],
  studentsByCountry: [
    { name: "USA", students: 38 },
    { name: "UK", students: 32 },
    { name: "Canada", students: 25 },
    { name: "Germany", students: 20 },
  ],
  cgpaDistribution: [
    { range: "3.5-4.0", count: 35 },
    { range: "3.0-3.5", count: 48 },
    { range: "2.5-3.0", count: 22 },
    { range: "2.0-2.5", count: 8 },
  ],
  enrollmentTrend: [
    { month: "Jan", students: 18 },
    { month: "Feb", students: 22 },
    { month: "Mar", students: 25 },
    { month: "Apr", students: 23 },
    { month: "May", students: 28 },
    { month: "Jun", students: 30 },
  ],
};

const SponsorDataAnalysis = () => {
  const { toast } = useToast();
  const chartsRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    nationality: "all",
    country: "all",
    university: "all",
  });

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const exportToPDF = async () => {
    if (!chartsRef.current) return;

    toast({
      title: "Generating PDF...",
      description: "Please wait while we prepare your report",
    });

    try {
      const canvas = await html2canvas(chartsRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      pdf.save("sponsor-student-analytics-report.pdf");

      toast({
        title: "Success",
        description: "Report exported successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export PDF",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Data Analysis</h1>
          <p className="text-muted-foreground mt-1">
            Analyze your sponsored students' data
          </p>
        </div>
        <Button onClick={exportToPDF} className="gap-2">
          <Download className="h-4 w-4" />
          Export as PDF
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Nationality</Label>
              <Select
                value={filters.nationality}
                onValueChange={(value) => handleFilterChange("nationality", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Nationalities</SelectItem>
                  <SelectItem value="egyptian">Egyptian</SelectItem>
                  <SelectItem value="saudi">Saudi</SelectItem>
                  <SelectItem value="jordanian">Jordanian</SelectItem>
                  <SelectItem value="iraqi">Iraqi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Country of Study</Label>
              <Select
                value={filters.country}
                onValueChange={(value) => handleFilterChange("country", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  <SelectItem value="usa">USA</SelectItem>
                  <SelectItem value="uk">UK</SelectItem>
                  <SelectItem value="canada">Canada</SelectItem>
                  <SelectItem value="germany">Germany</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>University</Label>
              <Select
                value={filters.university}
                onValueChange={(value) => handleFilterChange("university", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Universities</SelectItem>
                  <SelectItem value="harvard">Harvard</SelectItem>
                  <SelectItem value="mit">MIT</SelectItem>
                  <SelectItem value="stanford">Stanford</SelectItem>
                  <SelectItem value="oxford">Oxford</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div ref={chartsRef} className="space-y-6 bg-background p-6 rounded-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Students by Nationality */}
          <Card>
            <CardHeader>
              <CardTitle>Students by Nationality</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={mockData.studentsByNationality}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {mockData.studentsByNationality.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Students by Country */}
          <Card>
            <CardHeader>
              <CardTitle>Students by Study Country</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockData.studentsByCountry}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="students" fill="hsl(var(--chart-1))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* CGPA Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>CGPA Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockData.cgpaDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="hsl(var(--chart-2))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Enrollment Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Enrollment Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockData.enrollmentTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="students"
                    stroke="hsl(var(--chart-3))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SponsorDataAnalysis;
