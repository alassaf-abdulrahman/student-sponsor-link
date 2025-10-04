import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Calendar, MapPin, Users, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

type Program = {
  id: string;
  title: string;
  overview: string;
  place: string;
  date: Date;
  contentType: string;
  contactDetails: string;
  poster: string;
  status: "upcoming" | "ongoing" | "completed";
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
    status: "upcoming",
    enrolledCount: 45,
  },
  {
    id: "2",
    title: "Career Development Seminar",
    overview: "Learn about career opportunities and professional development strategies",
    place: "Conference Center",
    date: new Date("2024-02-28"),
    contentType: "Seminar",
    contactDetails: "careers@scholarship.org",
    poster: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400",
    status: "completed",
    enrolledCount: 78,
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
    status: "upcoming",
    enrolledCount: 32,
  },
];

const Programs = () => {
  const [programs, setPrograms] = useState<Program[]>(mockPrograms);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [newProgram, setNewProgram] = useState({
    title: "",
    overview: "",
    place: "",
    date: "",
    contentType: "",
    contactDetails: "",
    poster: "",
  });

  const filteredPrograms = programs.filter((program) =>
    program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.contentType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProgram = () => {
    if (!newProgram.title || !newProgram.date) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const program: Program = {
      id: String(programs.length + 1),
      ...newProgram,
      date: new Date(newProgram.date),
      status: "upcoming",
      enrolledCount: 0,
    };

    setPrograms([...programs, program]);
    setIsAddDialogOpen(false);
    setNewProgram({
      title: "",
      overview: "",
      place: "",
      date: "",
      contentType: "",
      contactDetails: "",
      poster: "",
    });

    toast({
      title: "Success",
      description: "Program created successfully",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "default";
      case "ongoing":
        return "secondary";
      case "completed":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Programs</h1>
          <p className="text-muted-foreground mt-1">
            Manage scholarship programs and track enrollments
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Program
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Program</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={newProgram.title}
                  onChange={(e) => setNewProgram({ ...newProgram, title: e.target.value })}
                  placeholder="Program title"
                />
              </div>
              <div>
                <Label htmlFor="overview">Overview</Label>
                <Textarea
                  id="overview"
                  value={newProgram.overview}
                  onChange={(e) => setNewProgram({ ...newProgram, overview: e.target.value })}
                  placeholder="Program description"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="poster">Poster URL</Label>
                <Input
                  id="poster"
                  value={newProgram.poster}
                  onChange={(e) => setNewProgram({ ...newProgram, poster: e.target.value })}
                  placeholder="https://example.com/poster.jpg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newProgram.date}
                    onChange={(e) => setNewProgram({ ...newProgram, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="contentType">Content Type</Label>
                  <Input
                    id="contentType"
                    value={newProgram.contentType}
                    onChange={(e) => setNewProgram({ ...newProgram, contentType: e.target.value })}
                    placeholder="Workshop, Seminar, etc."
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="place">Place</Label>
                <Input
                  id="place"
                  value={newProgram.place}
                  onChange={(e) => setNewProgram({ ...newProgram, place: e.target.value })}
                  placeholder="Event location"
                />
              </div>
              <div>
                <Label htmlFor="contactDetails">Contact Details</Label>
                <Input
                  id="contactDetails"
                  value={newProgram.contactDetails}
                  onChange={(e) => setNewProgram({ ...newProgram, contactDetails: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>
              <Button onClick={handleAddProgram} className="w-full">
                Create Program
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Programs</CardTitle>
            <Input
              placeholder="Search programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Place</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Enrolled</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrograms.map((program) => (
                <TableRow key={program.id}>
                  <TableCell className="font-medium">{program.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{program.contentType}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {format(program.date, "MMM dd, yyyy")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {program.place}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(program.status)}>
                      {program.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {program.enrolledCount}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/admin/programs/${program.id}`)}
                      className="gap-2"
                    >
                      <Eye className="h-4 w-4" />
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

export default Programs;
