import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-bold text-3xl mb-4">
          S
        </div>
        <h1 className="text-4xl font-bold text-foreground">
          Scholarship Portal
        </h1>
        <p className="text-xl text-muted-foreground max-w-md mx-auto">
          Connecting students with opportunities, sponsors with impact
        </p>
        <div className="pt-4 flex gap-4 justify-center">
          <Link to="/login">
            <Button size="lg" variant="default">
              Sign In
            </Button>
          </Link>
          <Link to="/register">
            <Button size="lg" variant="outline">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
