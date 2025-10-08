import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StudentDashboard from "./pages/StudentDashboard";
import StudentScholarships from "./pages/StudentScholarships";
import StudentScholarshipDetail from "./pages/StudentScholarshipDetail";
import StudentProfileCompletion from "./pages/StudentProfileCompletion";
import StudentTickets from "./pages/StudentTickets";
import StudentTicketDetail from "./pages/StudentTicketDetail";
import StudentPrograms from "./pages/StudentPrograms";
import StudentProgramDetail from "./pages/StudentProgramDetail";
import StudentOpportunities from "./pages/StudentOpportunities";
import StudentOpportunityDetail from "./pages/StudentOpportunityDetail";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Applications from "./pages/admin/Applications";
import ApplicationDetail from "./pages/admin/ApplicationDetail";
import Students from "./pages/admin/Students";
import StudentDetail from "./pages/admin/StudentDetail";
import Requests from "./pages/admin/Requests";
import RequestDetail from "./pages/admin/RequestDetail";
import StudyingCountries from "./pages/admin/StudyingCountries";
import Universities from "./pages/admin/Universities";
import Faculties from "./pages/admin/Faculties";
import Specializations from "./pages/admin/Specializations";
import Sponsors from "./pages/admin/Sponsors";
import Tickets from "./pages/admin/Tickets";
import TicketDetail from "./pages/admin/TicketDetail";
import Announcements from "./pages/admin/Announcements";
import Programs from "./pages/admin/Programs";
import ProgramDetail from "./pages/admin/ProgramDetail";
import Opportunities from "./pages/admin/Opportunities";
import OpportunityDetail from "./pages/admin/OpportunityDetail";
import DataAnalysis from "./pages/admin/DataAnalysis";
import PlaceholderPage from "./pages/admin/PlaceholderPage";
import NotFound from "./pages/NotFound";
import StudentHome from "./pages/StudentHome";
import Meetings from "./pages/admin/Meetings";
import Scholarships from "./pages/admin/Scholarships";

import SponsorLayout from "./pages/sponsor/SponsorLayout";
import SponsorDashboard from "./pages/sponsor/SponsorDashboard";
import SponsorStudents from "./pages/sponsor/SponsorStudents";
import SponsorStudentDetail from "./pages/sponsor/SponsorStudentDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Student Routes */}
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/student/home" element={<StudentHome />} />
            <Route path="/student/scholarships" element={<StudentScholarships />} />
            <Route path="/student/scholarships/:id" element={<StudentScholarshipDetail />} />
            <Route path="/student/profile-completion" element={<StudentProfileCompletion />} />
            <Route path="/student/programs" element={<StudentPrograms />} />
            <Route path="/student/programs/:id" element={<StudentProgramDetail />} />
            <Route path="/student/opportunities" element={<StudentOpportunities />} />
            <Route path="/student/opportunities/:id" element={<StudentOpportunityDetail />} />
            <Route path="/student/support" element={<StudentTickets />} />
            <Route path="/student/tickets/:id" element={<StudentTicketDetail />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
          <Route path="applications" element={<Applications />} />
          <Route path="applications/:id" element={<ApplicationDetail />} />
          <Route path="students" element={<Students />} />
          <Route path="students/:id" element={<StudentDetail />} />
              <Route path="requests" element={<Requests />} />
              <Route path="requests/:id" element={<RequestDetail />} />
              <Route path="countries" element={<StudyingCountries />} />
              <Route path="universities" element={<Universities />} />
              <Route path="faculties" element={<Faculties />} />
              <Route path="specializations" element={<Specializations />} />
              <Route path="scholarships" element={<Scholarships />} />
              <Route path="sponsors" element={<Sponsors />} />
              <Route path="tickets" element={<Tickets />} />
              <Route path="tickets/:id" element={<TicketDetail />} />
              <Route path="announcements" element={<Announcements />} />
              <Route path="programs" element={<Programs />} />
              <Route path="programs/:id" element={<ProgramDetail />} />
              <Route path="opportunities" element={<Opportunities />} />
              <Route path="opportunities/:id" element={<OpportunityDetail />} />
              <Route path="data-analysis" element={<DataAnalysis />} />
              <Route path="meetings" element={<Meetings />} />
            </Route>

            {/* Sponsor Routes */}
            <Route path="/sponsor" element={<SponsorLayout />}>
              <Route index element={<SponsorDashboard />} />
              <Route path="students" element={<SponsorStudents />} />
              <Route path="students/:id" element={<SponsorStudentDetail />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
