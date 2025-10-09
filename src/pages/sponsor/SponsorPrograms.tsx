import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Calendar, MapPin, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

type Program = {
  id: string;
  title: string;
  place: string;
  country: string;
  date: Date;
  contentType: string;
  status: "upcoming" | "ongoing" | "completed";
  enrolledCount: number;
};

// Mock programs for sponsor's students
const mockPrograms: Program[] = [
  {
    id: "1",
    title: "Leadership Workshop 2024",
    place: "University Main Hall",
    country: "USA",
    date: new Date("2024-03-15"),
    contentType: "Workshop",
    status: "upcoming",
    enrolledCount: 45,
  },
  {
    id: "2",
    title: "Research Methodology Seminar",
    place: "Conference Center",
    country: "UK",
    date: new Date("2024-04-10"),
    contentType: "Seminar",
    status: "upcoming",
    enrolledCount: 32,
  },
];

const SponsorPrograms = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPrograms = statusFilter === "all" 
    ? mockPrograms 
    : mockPrograms.filter(p => p.status === statusFilter);

  const handleViewDetails = (id: string) => {
    navigate(`/sponsor/programs/${id}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Programs</h1>
        <p className="text-muted-foreground mt-1">
          View programs for your sponsored students (Read-only)
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Programs ({filteredPrograms.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Enrolled</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrograms.map((program) => (
                <TableRow key={program.id}>
                  <TableCell className="font-medium">{program.title}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {program.country}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {format(program.date, "MMM dd, yyyy")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{program.contentType}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {program.enrolledCount}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        program.status === "upcoming"
                          ? "default"
                          : program.status === "ongoing"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {program.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetails(program.id)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SponsorPrograms;
