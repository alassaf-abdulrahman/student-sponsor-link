import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Globe, User, Bell } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const StudentHeader = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const isActivePath = (path: string) => location.pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/student" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              S
            </div>
            <span className="font-semibold text-lg hidden sm:inline-block">
              Scholarship Portal
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/student/programs"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActivePath("/student/programs")
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              Programs
            </Link>
            <Link
              to="/student/opportunities"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActivePath("/student/opportunities")
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              Volunteering
            </Link>
            <Link
              to="/student/requests"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActivePath("/student/requests")
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              Requests
            </Link>
            <Link
              to="/student/meetings"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActivePath("/student/meetings")
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              Meetings
            </Link>
            <Link
              to="/student/support"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActivePath("/student/support")
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

          <Link to="/student/notifications">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground flex items-center justify-center">
                3
              </span>
            </Button>
          </Link>

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
                <Link to="/student/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
