import { 
  Home, 
  FileText, 
  Users, 
  Globe, 
  Building2, 
  BookOpen, 
  GraduationCap, 
  CreditCard, 
  Building, 
  TicketIcon, 
  Bell, 
  Briefcase,
  TrendingUp,
  Calendar,
  Award
} from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Home", url: "/admin", icon: Home },
  { title: "Applications", url: "/admin/applications", icon: FileText },
  { title: "Students", url: "/admin/students", icon: Users },
  { title: "Studying Countries", url: "/admin/countries", icon: Globe },
  { title: "Universities", url: "/admin/universities", icon: Building2 },
  { title: "Faculties", url: "/admin/faculties", icon: BookOpen },
  { title: "Specializations", url: "/admin/specializations", icon: GraduationCap },
  { title: "Scholarships", url: "/admin/scholarships", icon: Award },
  { title: "Requests", url: "/admin/requests", icon: CreditCard },
  { title: "Sponsors", url: "/admin/sponsors", icon: Building },
  { title: "Tickets", url: "/admin/tickets", icon: TicketIcon },
  { title: "Announcements", url: "/admin/announcements", icon: Bell },
  { title: "Programs", url: "/admin/programs", icon: Briefcase },
  { title: "Opportunities", url: "/admin/opportunities", icon: Users },
  { title: "Data Analysis", url: "/admin/data-analysis", icon: TrendingUp },
  { title: "Meetings", url: "/admin/meetings", icon: Calendar },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center justify-between px-2 py-4">
            {!collapsed && (
              <SidebarGroupLabel className="text-lg font-bold">
                Admin Panel
              </SidebarGroupLabel>
            )}
            <SidebarTrigger className="ml-auto" />
          </div>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/admin"}
                      className={({ isActive }) =>
                        isActive ? "bg-accent text-accent-foreground" : ""
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
