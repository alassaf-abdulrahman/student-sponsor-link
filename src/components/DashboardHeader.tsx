import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Globe, Receipt, FolderOpen } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const DashboardHeader = () => {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
              S
            </div>
            <span className="hidden sm:inline text-lg font-semibold text-foreground">
              Scholarship Portal
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-2 sm:gap-4">
            {/* Programs - Placeholder */}
            <Button variant="ghost" size="sm" className="gap-2">
              <FolderOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Programs</span>
            </Button>

            {/* Tuition Fee Requests */}
            <Button variant="ghost" size="sm" className="gap-2">
              <Receipt className="h-4 w-4" />
              <span className="hidden sm:inline">Tuition Requests</span>
            </Button>

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline">EN</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>العربية</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt="Profile" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      JS
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline text-sm">John Smith</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                <DropdownMenuItem>My Applications</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  );
};
