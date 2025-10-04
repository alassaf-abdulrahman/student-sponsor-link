import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Mail, Users } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

type ProgramDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  program: {
    id: string;
    title: string;
    overview: string;
    place: string;
    date: Date;
    contentType: string;
    contactDetails: string;
    poster: string;
    enrolledCount: number;
  } | null;
  isEnrolled: boolean;
  onEnroll: (programId: string) => void;
};

export const ProgramDialog = ({
  open,
  onOpenChange,
  program,
  isEnrolled,
  onEnroll,
}: ProgramDialogProps) => {
  const { toast } = useToast();

  if (!program) return null;

  const handleEnroll = () => {
    onEnroll(program.id);
    toast({
      title: "Enrolled Successfully",
      description: `You have been enrolled in ${program.title}`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{program.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <img
            src={program.poster}
            alt={program.title}
            className="w-full h-64 object-cover rounded-lg"
          />

          <div className="flex items-center gap-2">
            <Badge>{program.contentType}</Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{program.enrolledCount} enrolled</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Overview</h3>
            <p className="text-muted-foreground">{program.overview}</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Date & Time</p>
                <p className="font-medium">{format(program.date, "MMMM dd, yyyy")}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{program.place}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Contact</p>
                <p className="font-medium">{program.contactDetails}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            {isEnrolled ? (
              <Badge variant="secondary" className="px-6 py-3 text-base">
                Already Enrolled
              </Badge>
            ) : (
              <Button onClick={handleEnroll} className="flex-1">
                Enroll in Program
              </Button>
            )}
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
