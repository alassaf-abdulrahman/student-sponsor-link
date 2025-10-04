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

type OpportunityDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  opportunity: {
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
  onEnroll: (opportunityId: string) => void;
};

export const OpportunityDialog = ({
  open,
  onOpenChange,
  opportunity,
  isEnrolled,
  onEnroll,
}: OpportunityDialogProps) => {
  const { toast } = useToast();

  if (!opportunity) return null;

  const handleEnroll = () => {
    onEnroll(opportunity.id);
    toast({
      title: "Enrolled Successfully",
      description: `You have been enrolled in ${opportunity.title}`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{opportunity.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <img
            src={opportunity.poster}
            alt={opportunity.title}
            className="w-full h-64 object-cover rounded-lg"
          />

          <div className="flex items-center gap-2">
            <Badge>{opportunity.contentType}</Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{opportunity.enrolledCount} volunteers</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Overview</h3>
            <p className="text-muted-foreground">{opportunity.overview}</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Date & Time</p>
                <p className="font-medium">{format(opportunity.date, "MMMM dd, yyyy")}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{opportunity.place}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Contact</p>
                <p className="font-medium">{opportunity.contactDetails}</p>
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
                Volunteer for this Opportunity
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
