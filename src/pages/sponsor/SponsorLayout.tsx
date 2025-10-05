import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SponsorSidebar } from "@/components/SponsorSidebar";
import { SponsorHeader } from "@/components/SponsorHeader";

const SponsorLayout = () => {
  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full">
        <SponsorSidebar />
        <div className="flex-1 flex flex-col">
          <SponsorHeader />
          <main className="flex-1 bg-background">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SponsorLayout;
