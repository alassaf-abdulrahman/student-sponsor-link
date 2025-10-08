import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, MapPin, Mail, ArrowLeft, Award, UserPlus, Eye, CheckCircle, XCircle, QrCode } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

type InvitedStudent = {
  id: string;
  name: string;
  email: string;
  country: string;
  university: string;
  scholarship: string;
  specialization: string;
  status: "accepted" | "excused" | "not-responded";
  excuse?: string;
  excuseStatus?: "pending" | "approved" | "rejected";
  attended?: boolean;
};

const mockProgram = {
  id: "1",
  title: "Leadership Workshop 2024",
  overview: "Develop essential leadership skills for your academic and professional journey. This comprehensive workshop covers team management, decision-making, communication, and strategic thinking.",
  place: "University Main Hall",
  country: "Malaysia",
  date: new Date("2024-03-15"),
  contentType: "Workshop",
  contactDetails: "events@scholarship.org",
  poster: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
  status: "completed",
  qrCodeAttendance: true,
  hasCertificate: true,
};

const mockInvitedStudents: InvitedStudent[] = [
  {
    id: "1",
    name: "Ahmed Hassan",
    email: "ahmed.hassan@email.com",
    country: "Malaysia",
    university: "MMU",
    scholarship: "XYZ Scholarship",
    specialization: "Computer Science",
    status: "accepted",
    attended: false,
  },
  {
    id: "2",
    name: "Sarah Mohammed",
    email: "sarah.m@email.com",
    country: "Malaysia",
    university: "UNITEN",
    scholarship: "XYZ Scholarship",
    specialization: "Engineering",
    status: "excused",
    excuse: "Medical appointment that cannot be rescheduled",
    excuseStatus: "pending",
  },
  {
    id: "3",
    name: "Omar Ali",
    email: "omar.ali@email.com",
    country: "Saudi Arabia",
    university: "KSU",
    scholarship: "ABC Scholarship",
    specialization: "Computer Science",
    status: "not-responded",
  },
  {
    id: "4",
    name: "Fatima Ibrahim",
    email: "fatima.i@email.com",
    country: "UAE",
    university: "AUS",
    scholarship: "DEF Scholarship",
    specialization: "Business",
    status: "accepted",
    attended: true,
  },
];

const mockCertificates = [
  { id: "1", name: "Modern Certificate Template", preview: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400" },
  { id: "2", name: "Classic Certificate Template", preview: "https://images.unsplash.com/photo-1587628604439-c7d6e93e4eec?w=400" },
  { id: "3", name: "Elegant Certificate Template", preview: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=400" },
];

const ProgramDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [students, setStudents] = useState<InvitedStudent[]>(mockInvitedStudents);
  const [isAttendanceConfirmed, setIsAttendanceConfirmed] = useState(false);
  const [certificatesGenerated, setCertificatesGenerated] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isCertificateDialogOpen, setIsCertificateDialogOpen] = useState(false);
  const [isExcuseDialogOpen, setIsExcuseDialogOpen] = useState(false);
  const [isQrDialogOpen, setIsQrDialogOpen] = useState(false);
  const [selectedExcuse, setSelectedExcuse] = useState<InvitedStudent | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  
  const [programData, setProgramData] = useState(mockProgram);
  
  // Invitation filters
  const [inviteFilters, setInviteFilters] = useState({
    countries: [] as string[],
    universities: [] as string[],
    scholarships: [] as string[],
    specializations: [] as string[],
    searchName: "",
  });
  
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const toggleAttendance = (studentId: string) => {
    setStudents(
      students.map((student) =>
        student.id === studentId
          ? { ...student, attended: !student.attended }
          : student
      )
    );
  };

  const confirmAllAttendance = () => {
    setIsAttendanceConfirmed(true);
    const attendedCount = students.filter((s) => s.attended).length;
    toast({
      title: "Attendance Confirmed",
      description: `${attendedCount} out of ${students.filter(s => s.status === "accepted").length} students marked as attended`,
    });
  };

  const handleGenerateCertificates = () => {
    if (!selectedCertificate) {
      toast({
        title: "No Certificate Design Selected",
        description: "Please select a certificate design first",
        variant: "destructive",
      });
      return;
    }
    setCertificatesGenerated(true);
    toast({
      title: "Certificates Generated",
      description: "Certificates are now available for students who attended.",
    });
  };

  const handleSelectCertificate = () => {
    if (!selectedCertificate) {
      toast({
        title: "No Selection",
        description: "Please select a certificate template",
        variant: "destructive",
      });
      return;
    }
    setIsCertificateDialogOpen(false);
    toast({
      title: "Certificate Template Selected",
      description: "Certificate design has been set for this program",
    });
  };

  const handleApproveExcuse = () => {
    if (selectedExcuse) {
      setStudents(students.map(s => 
        s.id === selectedExcuse.id 
          ? { ...s, excuseStatus: "approved" as const }
          : s
      ));
      toast({
        title: "Excuse Approved",
        description: `${selectedExcuse.name}'s excuse has been approved`,
      });
      setIsExcuseDialogOpen(false);
    }
  };

  const handleRejectExcuse = () => {
    if (selectedExcuse) {
      setStudents(students.map(s => 
        s.id === selectedExcuse.id 
          ? { ...s, excuseStatus: "rejected" as const }
          : s
      ));
      toast({
        title: "Excuse Rejected",
        description: `${selectedExcuse.name}'s excuse has been rejected`,
      });
      setIsExcuseDialogOpen(false);
    }
  };

  const handleSendInvitations = () => {
    if (selectedStudents.length === 0) {
      toast({
        title: "No Students Selected",
        description: "Please select at least one student",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Invitations Sent",
      description: `${selectedStudents.length} invitation(s) sent successfully`,
    });
    setIsInviteDialogOpen(false);
    setSelectedStudents([]);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    toast({
      title: "Program Updated",
      description: "Program information has been updated successfully",
    });
  };

  // Mock filtered students for invitation
  const filteredStudentsForInvite = [
    { id: "5", name: "Ali Khan", country: "Malaysia", university: "MMU", scholarship: "XYZ", specialization: "Computer Science" },
    { id: "6", name: "Layla Ahmed", country: "Malaysia", university: "UNITEN", scholarship: "XYZ", specialization: "Engineering" },
    { id: "7", name: "Yusuf Hassan", country: "Saudi Arabia", university: "KSU", scholarship: "ABC", specialization: "Medicine" },
  ];

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

  const acceptedStudents = students.filter(s => s.status === "accepted");
  const excusedStudents = students.filter(s => s.status === "excused");
  const notRespondedStudents = students.filter(s => s.status === "not-responded");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/admin/programs")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{mockProgram.title}</h1>
          <Badge variant={getStatusColor(mockProgram.status)} className="mt-2">
            {mockProgram.status}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="info">Program Info</TabsTrigger>
          <TabsTrigger value="invitations">Invitations</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>

        {/* Program Info Tab */}
        <TabsContent value="info" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Program Details</CardTitle>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => isEditing ? handleSaveEdit() : setIsEditing(true)}
                >
                  {isEditing ? "Save Changes" : "Edit"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {mockProgram.poster && !isEditing && (
                <img
                  src={mockProgram.poster}
                  alt={mockProgram.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              )}

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={programData.title}
                      onChange={(e) => setProgramData({ ...programData, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="overview">Overview</Label>
                    <Textarea
                      id="overview"
                      value={programData.overview}
                      onChange={(e) => setProgramData({ ...programData, overview: e.target.value })}
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="place">Place</Label>
                      <Input
                        id="place"
                        value={programData.place}
                        onChange={(e) => setProgramData({ ...programData, place: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={programData.country}
                        onChange={(e) => setProgramData({ ...programData, country: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="contact">Contact Details</Label>
                    <Input
                      id="contact"
                      value={programData.contactDetails}
                      onChange={(e) => setProgramData({ ...programData, contactDetails: e.target.value })}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Overview</h3>
                    <p className="text-muted-foreground">{mockProgram.overview}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-medium">{format(mockProgram.date, "MMMM dd, yyyy")}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Place</p>
                        <p className="font-medium">{mockProgram.place}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Country</p>
                        <p className="font-medium">{mockProgram.country}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Contact</p>
                        <p className="font-medium">{mockProgram.contactDetails}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{mockProgram.contentType}</Badge>
                    </div>
                    {mockProgram.qrCodeAttendance && (
                      <div className="flex items-center gap-2">
                        <QrCode className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">QR Code Attendance Enabled</span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Invitations Tab */}
        <TabsContent value="invitations" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Student Invitations</CardTitle>
                <Button onClick={() => setIsInviteDialogOpen(true)} className="gap-2">
                  <UserPlus className="h-4 w-4" />
                  Invite Students
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All ({students.length})</TabsTrigger>
                  <TabsTrigger value="accepted">Accepted ({acceptedStudents.length})</TabsTrigger>
                  <TabsTrigger value="excused">No Shows/Excused ({excusedStudents.length})</TabsTrigger>
                  <TabsTrigger value="not-responded">Not Responded ({notRespondedStudents.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>University</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>{student.university}</TableCell>
                          <TableCell>
                            <Badge variant={
                              student.status === "accepted" ? "default" :
                              student.status === "excused" ? "secondary" : "outline"
                            }>
                              {student.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="accepted">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>University</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {acceptedStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>{student.university}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="excused">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Excuse Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {excusedStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>
                            <Badge variant={
                              student.excuseStatus === "approved" ? "default" :
                              student.excuseStatus === "rejected" ? "destructive" : "secondary"
                            }>
                              {student.excuseStatus || "pending"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedExcuse(student);
                                setIsExcuseDialogOpen(true);
                              }}
                              className="gap-2"
                            >
                              <Eye className="h-4 w-4" />
                              View Excuse
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="not-responded">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>University</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {notRespondedStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>{student.university}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Attendance Management</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Mark attendance for accepted students</p>
                </div>
                <div className="flex gap-2">
                  {mockProgram.qrCodeAttendance && (
                    <Button
                      variant="outline"
                      onClick={() => setIsQrDialogOpen(true)}
                      className="gap-2"
                    >
                      <QrCode className="h-4 w-4" />
                      QR Code
                    </Button>
                  )}
                  <Button
                    onClick={confirmAllAttendance}
                    disabled={isAttendanceConfirmed}
                  >
                    {isAttendanceConfirmed ? "Attendance Confirmed" : "Confirm Attendance"}
                  </Button>
                  {mockProgram.hasCertificate && (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => setIsCertificateDialogOpen(true)}
                        className="gap-2"
                      >
                        <Award className="h-4 w-4" />
                        Certificate Design
                      </Button>
                      <Button
                        onClick={handleGenerateCertificates}
                        disabled={!isAttendanceConfirmed || certificatesGenerated}
                        className="gap-2"
                      >
                        <Award className="h-4 w-4" />
                        {certificatesGenerated ? "Certificates Generated" : "Generate Certificates"}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Accepted</span>
                      <span className="text-2xl font-bold">{acceptedStudents.length}</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Attended</span>
                      <span className="text-2xl font-bold text-green-600">
                        {acceptedStudents.filter((s) => s.attended).length}
                      </span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Attendance Rate</span>
                      <span className="text-lg font-semibold">
                        {acceptedStudents.length > 0
                          ? Math.round(
                              (acceptedStudents.filter((s) => s.attended).length / acceptedStudents.length) * 100
                            )
                          : 0}
                        %
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>University</TableHead>
                    <TableHead>Attended</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {acceptedStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.university}</TableCell>
                      <TableCell>
                        <Checkbox
                          checked={student.attended}
                          onCheckedChange={() => toggleAttendance(student.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Invite Students Dialog */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Invite Students to Program</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Countries</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select countries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="malaysia">Malaysia</SelectItem>
                    <SelectItem value="saudi">Saudi Arabia</SelectItem>
                    <SelectItem value="uae">UAE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Universities</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select universities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mmu">MMU</SelectItem>
                    <SelectItem value="uniten">UNITEN</SelectItem>
                    <SelectItem value="ksu">KSU</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Scholarships</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select scholarships" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="xyz">XYZ Scholarship</SelectItem>
                    <SelectItem value="abc">ABC Scholarship</SelectItem>
                    <SelectItem value="def">DEF Scholarship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Specializations</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select specializations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cs">Computer Science</SelectItem>
                    <SelectItem value="eng">Engineering</SelectItem>
                    <SelectItem value="med">Medicine</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label>Search by Name</Label>
              <Input placeholder="Search student name..." />
            </div>

            <div className="border rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Filtered Students ({filteredStudentsForInvite.length})</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (selectedStudents.length === filteredStudentsForInvite.length) {
                      setSelectedStudents([]);
                    } else {
                      setSelectedStudents(filteredStudentsForInvite.map(s => s.id));
                    }
                  }}
                >
                  {selectedStudents.length === filteredStudentsForInvite.length ? "Deselect All" : "Select All"}
                </Button>
              </div>
              
              <div className="max-h-64 overflow-y-auto space-y-2">
                {filteredStudentsForInvite.map((student) => (
                  <div key={student.id} className="flex items-center gap-3 p-2 hover:bg-muted rounded">
                    <Checkbox
                      checked={selectedStudents.includes(student.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedStudents([...selectedStudents, student.id]);
                        } else {
                          setSelectedStudents(selectedStudents.filter(id => id !== student.id));
                        }
                      }}
                    />
                    <div className="flex-1">
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {student.university} • {student.specialization} • {student.country}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendInvitations}>
              Send Invitations ({selectedStudents.length})
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Certificate Selection Dialog */}
      <Dialog open={isCertificateDialogOpen} onOpenChange={setIsCertificateDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Select Certificate Template</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-3 gap-4">
            {mockCertificates.map((cert) => (
              <div
                key={cert.id}
                className={`cursor-pointer border-2 rounded-lg p-2 ${
                  selectedCertificate === cert.id ? "border-primary" : "border-muted"
                }`}
                onClick={() => setSelectedCertificate(cert.id)}
              >
                <img src={cert.preview} alt={cert.name} className="w-full h-32 object-cover rounded" />
                <p className="text-sm font-medium mt-2 text-center">{cert.name}</p>
                {selectedCertificate === cert.id && (
                  <div className="flex justify-center mt-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCertificateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSelectCertificate}>
              Confirm Selection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Excuse Review Dialog */}
      <Dialog open={isExcuseDialogOpen} onOpenChange={setIsExcuseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Excuse</DialogTitle>
          </DialogHeader>
          
          {selectedExcuse && (
            <div className="space-y-4">
              <div>
                <Label>Student Name</Label>
                <p className="font-medium">{selectedExcuse.name}</p>
              </div>
              <div>
                <Label>Email</Label>
                <p className="text-muted-foreground">{selectedExcuse.email}</p>
              </div>
              <div>
                <Label>Excuse</Label>
                <p className="p-3 bg-muted rounded-md">{selectedExcuse.excuse}</p>
              </div>
              <div>
                <Label>Current Status</Label>
                <Badge variant={
                  selectedExcuse.excuseStatus === "approved" ? "default" :
                  selectedExcuse.excuseStatus === "rejected" ? "destructive" : "secondary"
                }>
                  {selectedExcuse.excuseStatus || "pending"}
                </Badge>
              </div>
            </div>
          )}

          <DialogFooter>
            {selectedExcuse?.excuseStatus === "pending" && (
              <>
                <Button variant="outline" onClick={handleRejectExcuse} className="gap-2">
                  <XCircle className="h-4 w-4" />
                  Reject
                </Button>
                <Button onClick={handleApproveExcuse} className="gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Approve
                </Button>
              </>
            )}
            {selectedExcuse?.excuseStatus !== "pending" && (
              <Button onClick={() => setIsExcuseDialogOpen(false)}>
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* QR Code Dialog */}
      <Dialog open={isQrDialogOpen} onOpenChange={setIsQrDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Program QR Code</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col items-center gap-4">
            <div className="p-8 bg-white rounded-lg">
              {/* Mock QR Code - Replace with actual QR code generation when cloud is enabled */}
              <div className="w-64 h-64 border-4 border-gray-900 rounded-lg flex items-center justify-center">
                <QrCode className="h-32 w-32 text-gray-900" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Students can scan this QR code to mark their attendance
            </p>
            <p className="text-xs text-muted-foreground text-center">
              Program ID: {mockProgram.id}
            </p>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsQrDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => {
              toast({
                title: "QR Code Downloaded",
                description: "QR code has been saved to your device",
              });
            }}>
              Download QR Code
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProgramDetail;
