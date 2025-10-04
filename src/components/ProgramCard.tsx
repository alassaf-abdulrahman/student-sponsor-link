import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import { format } from "date-fns";

type ProgramCardProps = {
  id: string;
  title: string;
  overview: string;
  place: string;
  date: Date;
  contentType: string;
  poster: string;
  enrolledCount: number;
  isEnrolled: boolean;
  onViewDetails: (id: string) => void;
};

export const ProgramCard = ({
  id,
  title,
  overview,
  place,
  date,
  contentType,
  poster,
  enrolledCount,
  isEnrolled,
  onViewDetails,
}: ProgramCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video relative">
        <img
          src={poster}
          alt={title}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-4 right-4">{contentType}</Badge>
      </div>
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="font-bold text-xl mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {overview}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{format(date, "MMMM dd, yyyy")}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{place}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{enrolledCount} enrolled</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onViewDetails(id)}
          >
            View Details
          </Button>
          {isEnrolled ? (
            <Badge variant="secondary" className="px-4 py-2">
              Enrolled
            </Badge>
          ) : (
            <Button className="flex-1">Enroll Now</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
