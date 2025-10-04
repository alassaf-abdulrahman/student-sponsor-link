import { useState } from "react";
import { Link } from "react-router-dom";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, GraduationCap, MapPin, Calendar } from "lucide-react";

// Mock data for available scholarships
const mockScholarships = [
  {
    id: 1,
    name: "Full Academic Scholarship 2024",
    description: "Full tuition coverage for undergraduate programs in engineering and sciences",
    sponsor: "Tech Foundation",
    country: "United States",
    studyLevel: "Bachelor",
    deadline: "2024-12-31",
    status: "Open",
    coverage: "Full Tuition + Living Expenses"
  },
  {
    id: 2,
    name: "Graduate Research Grant",
    description: "Support for graduate students pursuing research in renewable energy",
    sponsor: "Green Energy Initiative",
    country: "Germany",
    studyLevel: "Master",
    deadline: "2024-11-15",
    status: "Open",
    coverage: "Full Tuition"
  },
  {
    id: 3,
    name: "Medical Sciences Scholarship",
    description: "Comprehensive support for medical students with outstanding academic records",
    sponsor: "Health Care Foundation",
    country: "Canada",
    studyLevel: "Bachelor",
    deadline: "2024-10-30",
    status: "Open",
    coverage: "Full Tuition + Stipend"
  }
];

const StudentScholarships = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [filterCountry, setFilterCountry] = useState("all");

  const filteredScholarships = mockScholarships.filter(scholarship => {
    const matchesSearch = scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === "all" || scholarship.studyLevel === filterLevel;
    const matchesCountry = filterCountry === "all" || scholarship.country === filterCountry;
    return matchesSearch && matchesLevel && matchesCountry;
  });

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Available Scholarships</h1>
          <p className="text-muted-foreground">
            Browse and apply for scholarships that match your qualifications
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search scholarships..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Select value={filterLevel} onValueChange={setFilterLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Study Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Bachelor">Bachelor</SelectItem>
                  <SelectItem value="Master">Master</SelectItem>
                  <SelectItem value="PhD">PhD</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterCountry} onValueChange={setFilterCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="Germany">Germany</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Scholarships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScholarships.map((scholarship) => (
            <Card key={scholarship.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">{scholarship.status}</Badge>
                  <Badge variant="outline">{scholarship.studyLevel}</Badge>
                </div>
                <CardTitle className="text-xl">{scholarship.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {scholarship.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Sponsor:</span>
                    <span className="font-medium">{scholarship.sponsor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Country:</span>
                    <span className="font-medium">{scholarship.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Deadline:</span>
                    <span className="font-medium">{scholarship.deadline}</span>
                  </div>
                  <div className="pt-2">
                    <span className="text-xs text-muted-foreground">Coverage:</span>
                    <p className="text-sm font-medium">{scholarship.coverage}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link to={`/student/scholarships/${scholarship.id}`} className="w-full">
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredScholarships.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No scholarships found matching your criteria</p>
          </Card>
        )}
      </main>
    </div>
  );
};

export default StudentScholarships;
