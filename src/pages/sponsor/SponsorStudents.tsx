import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Search, Eye } from "lucide-react";

type Student = {
  id: number;
  name: string;
  email: string;
  country: string;
  university: string;
  specialization: string;
  cgpa: number;
  status: "Active" | "At Risk" | "Warning";
};

const mockStudents: Student[] = [
  { id: 1, name: "Ahmed Ali", email: "ahmed@email.com", country: "Saudi Arabia", university: "King Saud University", specialization: "Computer Science", cgpa: 3.8, status: "Active" },
  { id: 2, name: "Fatima Hassan", email: "fatima@email.com", country: "Egypt", university: "Cairo University", specialization: "Engineering", cgpa: 3.5, status: "Active" },
  { id: 3, name: "Omar Ibrahim", email: "omar@email.com", country: "Jordan", university: "University of Jordan", specialization: "Medicine", cgpa: 2.9, status: "Warning" },
  { id: 4, name: "Layla Mohammed", email: "layla@email.com", country: "UAE", university: "UAE University", specialization: "Business", cgpa: 2.5, status: "At Risk" },
  { id: 5, name: "Yusuf Abdullah", email: "yusuf@email.com", country: "Kuwait", university: "Kuwait University", specialization: "Engineering", cgpa: 3.9, status: "Active" },
  { id: 6, name: "Amina Khalid", email: "amina@email.com", country: "Saudi Arabia", university: "KAUST", specialization: "Computer Science", cgpa: 3.7, status: "Active" },
  { id: 7, name: "Hassan Ahmed", email: "hassan@email.com", country: "Qatar", university: "Qatar University", specialization: "Medicine", cgpa: 3.2, status: "Active" },
  { id: 8, name: "Sara Mahmoud", email: "sara@email.com", country: "Lebanon", university: "AUB", specialization: "Business", cgpa: 2.8, status: "Warning" },
];

const SponsorStudents = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.university.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active": return "default";
      case "Warning": return "secondary";
      case "At Risk": return "destructive";
      default: return "outline";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Students</h1>
        <p className="text-muted-foreground">View and manage students under your sponsorship</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Students List</CardTitle>
          <div className="flex gap-4 mt-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or university..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-background z-50">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Warning">Warning</SelectItem>
                <SelectItem value="At Risk">At Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>University</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>CGPA</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.country}</TableCell>
                  <TableCell>{student.university}</TableCell>
                  <TableCell>{student.specialization}</TableCell>
                  <TableCell>{student.cgpa.toFixed(1)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(student.status)}>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/sponsor/students/${student.id}`)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Profile
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SponsorStudents;
