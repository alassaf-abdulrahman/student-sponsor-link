import { StudentHeader } from "@/components/StudentHeader";
import { KPICard } from "@/components/KPICard";
import { HealthScore } from "@/components/HealthScore";
import { ProgramCard } from "@/components/ProgramCard";
import { ProgramDialog } from "@/components/ProgramDialog";
import { OpportunityCard } from "@/components/OpportunityCard";
import { OpportunityDialog } from "@/components/OpportunityDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { X, Megaphone, GraduationCap, DollarSign, TrendingUp, FileText, Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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

type Semester = {
  id: string;
  semesterNo: number;
  coursesCount: number;
  totalCredits: number;
  startDate: string;
  endDate: string;
  cgpa: string;
  status: "active" | "completed";
  transcript?: string;
};

const StudentDashboard = () => {
  const { toast } = useToast();
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isProgramDialogOpen, setIsProgramDialogOpen] = useState(false);
  const [enrolledPrograms, setEnrolledPrograms] = useState<string[]>([]);

  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null);
  const [isOpportunityDialogOpen, setIsOpportunityDialogOpen] = useState(false);
  const [enrolledOpportunities, setEnrolledOpportunities] = useState<string[]>([]);

  // Semesters state
  const [semesters, setSemesters] = useState<Semester[]>([
    {
      id: "1",
      semesterNo: 1,
      coursesCount: 5,
      totalCredits: 15,
      startDate: "2023-09-01",
      endDate: "2024-01-15",
      cgpa: "3.9",
      status: "completed",
      transcript: "transcript-1.pdf",
    },
    {
      id: "2",
      semesterNo: 2,
      coursesCount: 5,
      totalCredits: 15,
      startDate: "2024-02-01",
      endDate: "2024-06-15",
      cgpa: "3.8",
      status: "completed",
      transcript: "transcript-2.pdf",
    },
    {
      id: "3",
      semesterNo: 3,
      coursesCount: 4,
      totalCredits: 12,
      startDate: "2024-09-01",
      endDate: "2025-01-15",
      cgpa: "N/A",
      status: "active",
    },
  ]);
  const [isAddSemesterOpen, setIsAddSemesterOpen] = useState(false);
  const [isEditSemesterOpen, setIsEditSemesterOpen] = useState(false);
  const [editingSemester, setEditingSemester] = useState<Semester | null>(null);
  const [newSemester, setNewSemester] = useState<Partial<Semester>>({
    semesterNo: semesters.length + 1,
    coursesCount: 0,
    totalCredits: 0,
    startDate: "",
    endDate: "",
    cgpa: "N/A",
    status: "active",
  });
  const [isCompleted, setIsCompleted] = useState(false);
  const [transcriptFile, setTranscriptFile] = useState<File | null>(null);

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

  const hasActiveSemester = semesters.some(s => s.status === "active");

  const handleAddSemester = () => {
    if (hasActiveSemester) {
      toast({
        title: "Cannot add semester",
        description: "You have an active semester. Please complete it before adding a new one.",
        variant: "destructive",
      });
      return;
    }
    setIsAddSemesterOpen(true);
  };

  const handleSaveSemester = () => {
    const semester: Semester = {
      id: String(Date.now()),
      semesterNo: newSemester.semesterNo || semesters.length + 1,
      coursesCount: newSemester.coursesCount || 0,
      totalCredits: newSemester.totalCredits || 0,
      startDate: newSemester.startDate || "",
      endDate: newSemester.endDate || "",
      cgpa: isCompleted ? newSemester.cgpa || "N/A" : "N/A",
      status: isCompleted ? "completed" : "active",
      transcript: transcriptFile ? transcriptFile.name : undefined,
    };

    setSemesters([...semesters, semester]);
    setIsAddSemesterOpen(false);
    setNewSemester({
      semesterNo: semesters.length + 2,
      coursesCount: 0,
      totalCredits: 0,
      startDate: "",
      endDate: "",
      cgpa: "N/A",
      status: "active",
    });
    setIsCompleted(false);
    setTranscriptFile(null);
    toast({
      title: "Semester added",
      description: "Your semester has been added successfully.",
    });
  };

  const handleEditSemester = (semester: Semester) => {
    setEditingSemester(semester);
    setIsCompleted(semester.status === "completed");
    setIsEditSemesterOpen(true);
  };

  const handleUpdateSemester = () => {
    if (!editingSemester) return;

    setSemesters(semesters.map(s =>
      s.id === editingSemester.id
        ? {
          ...editingSemester,
          status: isCompleted ? "completed" : "active",
          cgpa: isCompleted ? editingSemester.cgpa : "N/A",
          transcript: transcriptFile ? transcriptFile.name : editingSemester.transcript,
        }
        : s
    ));
    setIsEditSemesterOpen(false);
    setEditingSemester(null);
    setIsCompleted(false);
    setTranscriptFile(null);
    toast({
      title: "Semester updated",
      description: "Your semester has been updated successfully.",
    });
  };

  const handleDeleteSemester = (id: string) => {
    setSemesters(semesters.filter(s => s.id !== id));
    toast({
      title: "Semester deleted",
      description: "Your semester has been deleted successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <StudentHeader />

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

        {/* Semesters Section */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">My Semesters</CardTitle>
                <Button onClick={handleAddSemester}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Semester
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Semester No</TableHead>
                    <TableHead>Courses</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>CGPA</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Transcript</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {semesters.map((semester) => (
                    <TableRow key={semester.id}>
                      <TableCell className="font-medium">{semester.semesterNo}</TableCell>
                      <TableCell>{semester.coursesCount}</TableCell>
                      <TableCell>{semester.totalCredits}</TableCell>
                      <TableCell>{semester.startDate}</TableCell>
                      <TableCell>{semester.endDate}</TableCell>
                      <TableCell>{semester.cgpa}</TableCell>
                      <TableCell>
                        <Badge variant={semester.status === "active" ? "default" : "secondary"}>
                          {semester.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {semester.transcript && (
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditSemester(semester)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteSemester(semester.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
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

        {/* Add Semester Dialog */}
        <Dialog open={isAddSemesterOpen} onOpenChange={setIsAddSemesterOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Semester</DialogTitle>
              <DialogDescription>
                Fill in the semester details. Note: You cannot add a new semester if you have an active one.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="semesterNo">Semester Number</Label>
                <Input
                  id="semesterNo"
                  type="number"
                  value={newSemester.semesterNo}
                  onChange={(e) => setNewSemester({ ...newSemester, semesterNo: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="coursesCount">Number of Courses</Label>
                <Input
                  id="coursesCount"
                  type="number"
                  value={newSemester.coursesCount}
                  onChange={(e) => setNewSemester({ ...newSemester, coursesCount: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="totalCredits">Total Credits</Label>
                <Input
                  id="totalCredits"
                  type="number"
                  value={newSemester.totalCredits}
                  onChange={(e) => setNewSemester({ ...newSemester, totalCredits: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newSemester.startDate}
                  onChange={(e) => setNewSemester({ ...newSemester, startDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newSemester.endDate}
                  onChange={(e) => setNewSemester({ ...newSemester, endDate: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="completed">Semester Completed?</Label>
                  <Switch
                    id="completed"
                    checked={isCompleted}
                    onCheckedChange={setIsCompleted}
                  />
                </div>
              </div>
              {isCompleted && (
                <>
                  <div>
                    <Label htmlFor="cgpa">CGPA</Label>
                    <Input
                      id="cgpa"
                      type="text"
                      value={newSemester.cgpa}
                      onChange={(e) => setNewSemester({ ...newSemester, cgpa: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="transcript">Transcript</Label>
                    <Input
                      id="transcript"
                      type="file"
                      onChange={(e) => setTranscriptFile(e.target.files?.[0] || null)}
                    />
                  </div>
                </>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddSemesterOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveSemester}>Add Semester</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Semester Dialog */}
        <Dialog open={isEditSemesterOpen} onOpenChange={setIsEditSemesterOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Semester</DialogTitle>
              <DialogDescription>
                Update the semester status and details.
              </DialogDescription>
            </DialogHeader>
            {editingSemester && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-semesterNo">Semester Number</Label>
                  <Input
                    id="edit-semesterNo"
                    type="number"
                    value={editingSemester.semesterNo}
                    onChange={(e) => setEditingSemester({ ...editingSemester, semesterNo: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-coursesCount">Number of Courses</Label>
                  <Input
                    id="edit-coursesCount"
                    type="number"
                    value={editingSemester.coursesCount}
                    onChange={(e) => setEditingSemester({ ...editingSemester, coursesCount: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-totalCredits">Total Credits</Label>
                  <Input
                    id="edit-totalCredits"
                    type="number"
                    value={editingSemester.totalCredits}
                    onChange={(e) => setEditingSemester({ ...editingSemester, totalCredits: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-startDate">Start Date</Label>
                  <Input
                    id="edit-startDate"
                    type="date"
                    value={editingSemester.startDate}
                    onChange={(e) => setEditingSemester({ ...editingSemester, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-endDate">End Date</Label>
                  <Input
                    id="edit-endDate"
                    type="date"
                    value={editingSemester.endDate}
                    onChange={(e) => setEditingSemester({ ...editingSemester, endDate: e.target.value })}
                  />
                </div>
                <div className="col-span-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="edit-completed">Semester Completed?</Label>
                    <Switch
                      id="edit-completed"
                      checked={isCompleted}
                      onCheckedChange={setIsCompleted}
                    />
                  </div>
                </div>
                {isCompleted && (
                  <>
                    <div>
                      <Label htmlFor="edit-cgpa">CGPA</Label>
                      <Input
                        id="edit-cgpa"
                        type="text"
                        value={editingSemester.cgpa}
                        onChange={(e) => setEditingSemester({ ...editingSemester, cgpa: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-transcript">Transcript</Label>
                      <Input
                        id="edit-transcript"
                        type="file"
                        onChange={(e) => setTranscriptFile(e.target.files?.[0] || null)}
                      />
                      {editingSemester.transcript && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Current: {editingSemester.transcript}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditSemesterOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateSemester}>Update Semester</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default StudentDashboard;
