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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Calendar, MapPin, Users, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

type Opportunity = {
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

const mockOpportunities: Opportunity[] = [
  {
    id: "1",
    title: "Community Clean-Up Drive",
    overview: "Help maintain a clean and sustainable community environment",
    place: "Central Park",
    date: new Date("2024-03-20"),
    contentType: "Environmental",
    contactDetails: "volunteer@community.org",
    poster: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400",
    status: "upcoming",
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
    status: "upcoming",
    enrolledCount: 15,
  },
];

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [contentTypeFilter, setContentTypeFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [newOpportunity, setNewOpportunity] = useState({
    title: "",
    overview: "",
    place: "",
    date: "",
    contentType: "",
    contactDetails: "",
    poster: "",
    notifyUniversity: "",
  });

  const filteredOpportunities = opportunities.filter((opportunity) => {
    const matchesSearch = opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.contentType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || opportunity.status === statusFilter;
    const matchesContentType = contentTypeFilter === "all" || opportunity.contentType.toLowerCase() === contentTypeFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesContentType;
  });

  const handleAddOpportunity = () => {
    if (!newOpportunity.title || !newOpportunity.date) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const opportunity: Opportunity = {
      id: String(opportunities.length + 1),
      ...newOpportunity,
      date: new Date(newOpportunity.date),
      status: "upcoming",
      enrolledCount: 0,
    };

    setOpportunities([...opportunities, opportunity]);
    setIsAddDialogOpen(false);
    setNewOpportunity({
      title: "",
      overview: "",
      place: "",
      date: "",
      contentType: "",
      contactDetails: "",
      poster: "",
      notifyUniversity: "",
    });

    toast({
      title: "Success",
      description: "Volunteering opportunity created successfully",
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
          <h1 className="text-3xl font-bold text-foreground">Volunteering Opportunities</h1>
          <p className="text-muted-foreground mt-1">
            Manage volunteering opportunities and track volunteer hours
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Opportunity
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Volunteering Opportunity</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={newOpportunity.title}
                  onChange={(e) => setNewOpportunity({ ...newOpportunity, title: e.target.value })}
                  placeholder="Opportunity title"
                />
              </div>
              <div>
                <Label htmlFor="overview">Overview</Label>
                <Textarea
                  id="overview"
                  value={newOpportunity.overview}
                  onChange={(e) => setNewOpportunity({ ...newOpportunity, overview: e.target.value })}
                  placeholder="Opportunity description"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="poster">Poster URL</Label>
                <Input
                  id="poster"
                  value={newOpportunity.poster}
                  onChange={(e) => setNewOpportunity({ ...newOpportunity, poster: e.target.value })}
                  placeholder="https://example.com/poster.jpg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newOpportunity.date}
                    onChange={(e) => setNewOpportunity({ ...newOpportunity, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="contentType">Content Type</Label>
                  <Input
                    id="contentType"
                    value={newOpportunity.contentType}
                    onChange={(e) => setNewOpportunity({ ...newOpportunity, contentType: e.target.value })}
                    placeholder="Environmental, Education, etc."
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="place">Place</Label>
                <Input
                  id="place"
                  value={newOpportunity.place}
                  onChange={(e) => setNewOpportunity({ ...newOpportunity, place: e.target.value })}
                  placeholder="Event location"
                />
              </div>
              <div>
                <Label htmlFor="contactDetails">Contact Details</Label>
                <Input
                  id="contactDetails"
                  value={newOpportunity.contactDetails}
                  onChange={(e) => setNewOpportunity({ ...newOpportunity, contactDetails: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <Label htmlFor="notifyUniversity">Notify University Students</Label>
                <Select
                  value={newOpportunity.notifyUniversity}
                  onValueChange={(value) => setNewOpportunity({ ...newOpportunity, notifyUniversity: value })}
                >
                  <SelectTrigger id="notifyUniversity">
                    <SelectValue placeholder="Select university" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Universities</SelectItem>
                    <SelectItem value="harvard">Harvard University</SelectItem>
                    <SelectItem value="mit">MIT</SelectItem>
                    <SelectItem value="stanford">Stanford University</SelectItem>
                    <SelectItem value="oxford">Oxford University</SelectItem>
                    <SelectItem value="cambridge">Cambridge University</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddOpportunity} className="w-full">
                Create Opportunity
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4">
            <CardTitle>All Opportunities</CardTitle>
            <div className="flex items-center gap-4 flex-wrap">
              <Input
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-xs"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={contentTypeFilter} onValueChange={setContentTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="environmental">Environmental</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
                <TableHead>Volunteers</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOpportunities.map((opportunity) => (
                <TableRow key={opportunity.id}>
                  <TableCell className="font-medium">{opportunity.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{opportunity.contentType}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {format(opportunity.date, "MMM dd, yyyy")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {opportunity.place}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(opportunity.status)}>
                      {opportunity.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {opportunity.enrolledCount}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/admin/opportunities/${opportunity.id}`)}
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

export default Opportunities;
