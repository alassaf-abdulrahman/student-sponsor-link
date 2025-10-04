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
  sponsor: string;
  country: string;
  university: string;
};

const mockData = {
  studentsByNationality: [
    { name: "Egyptian", value: 120 },
    { name: "Saudi", value: 85 },
    { name: "Jordanian", value: 65 },
    { name: "Iraqi", value: 45 },
    { name: "Palestinian", value: 40 },
  ],
  studentsByCountry: [
    { name: "USA", students: 95 },
    { name: "UK", students: 78 },
    { name: "Canada", students: 65 },
    { name: "Germany", students: 52 },
    { name: "Australia", students: 45 },
  ],
  cgpaDistribution: [
    { range: "3.5-4.0", count: 85 },
    { range: "3.0-3.5", count: 120 },
    { range: "2.5-3.0", count: 65 },
    { range: "2.0-2.5", count: 25 },
  ],
  enrollmentTrend: [
    { month: "Jan", students: 45 },
    { month: "Feb", students: 52 },
    { month: "Mar", students: 61 },
    { month: "Apr", students: 58 },
    { month: "May", students: 70 },
    { month: "Jun", students: 75 },
  ],
  sponsorDistribution: [
    { name: "Government", value: 145 },
    { name: "Private", value: 98 },
    { name: "NGO", value: 76 },
    { name: "University", value: 45 },
  ],
};

const DataAnalysis = () => {
  const { toast } = useToast();
  const chartsRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    nationality: "all",
    sponsor: "all",
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

      pdf.save("student-analytics-report.pdf");

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
            Analyze student data with customizable filters
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <Label>Sponsor</Label>
              <Select
                value={filters.sponsor}
                onValueChange={(value) => handleFilterChange("sponsor", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sponsors</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="ngo">NGO</SelectItem>
                  <SelectItem value="university">University</SelectItem>
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

          {/* Sponsor Distribution */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Students by Sponsor Type</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockData.sponsorDistribution} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(var(--chart-4))">
                    {mockData.sponsorDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DataAnalysis;
