import { Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

const PlaceholderPage = ({ title, description }: PlaceholderPageProps) => {
  return (
    <div className="p-8">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Construction className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
        <p className="text-muted-foreground max-w-md">
          {description}
        </p>
      </div>
    </div>
  );
};

export default PlaceholderPage;
