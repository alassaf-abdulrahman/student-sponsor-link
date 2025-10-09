import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Globe, User, FileText } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const ApplicantHeader = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/applicant" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              S
            </div>
            <span className="font-semibold text-lg hidden sm:inline-block">
              Scholarship Portal
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/applicant/profile"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActivePath("/applicant/profile")
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              Profile
            </Link>
            <Link
              to="/applicant/scholarships"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActivePath("/applicant/scholarships") || isActivePath("/applicant")
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              Scholarships
            </Link>
            <Link
              to="/applicant/support"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActivePath("/applicant/support")
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              Support
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Arabic</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/applicant/applications" className="flex items-center cursor-pointer">
                  <FileText className="mr-2 h-4 w-4" />
                  My Applications
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
