import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StudentDashboard from "./pages/StudentDashboard";
import StudentTickets from "./pages/StudentTickets";
import StudentTicketDetail from "./pages/StudentTicketDetail";
import StudentPrograms from "./pages/StudentPrograms";
import StudentProgramDetail from "./pages/StudentProgramDetail";
import StudentOpportunities from "./pages/StudentOpportunities";
import StudentOpportunityDetail from "./pages/StudentOpportunityDetail";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Applications from "./pages/admin/Applications";
import TuitionRequests from "./pages/admin/TuitionRequests";
import StudyingCountries from "./pages/admin/StudyingCountries";
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
            <Route path="/student" element={<StudentDashboard />} />
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
              <Route path="tuition-requests" element={<TuitionRequests />} />
              <Route path="countries" element={<StudyingCountries />} />
              <Route path="students" element={<PlaceholderPage title="Students" description="Student management page coming soon" />} />
              <Route path="universities" element={<PlaceholderPage title="Universities" description="University management page coming soon" />} />
              <Route path="faculties" element={<PlaceholderPage title="Faculties" description="Faculty management page coming soon" />} />
              <Route path="specializations" element={<PlaceholderPage title="Specializations" description="Specialization management page coming soon" />} />
              <Route path="sponsors" element={<PlaceholderPage title="Sponsors" description="Sponsor management page coming soon" />} />
              <Route path="tickets" element={<Tickets />} />
              <Route path="tickets/:id" element={<TicketDetail />} />
              <Route path="announcements" element={<Announcements />} />
            <Route path="programs" element={<Programs />} />
            <Route path="programs/:id" element={<ProgramDetail />} />
            <Route path="opportunities" element={<Opportunities />} />
            <Route path="opportunities/:id" element={<OpportunityDetail />} />
            <Route path="data-analysis" element={<DataAnalysis />} />
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
