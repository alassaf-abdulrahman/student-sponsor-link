import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Mail, Users, ArrowLeft } from "lucide-react";
import { format } from "date-fns";

const SponsorOpportunityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - matches the opportunity from SponsorOpportunities
  const opportunity = {
    id: "1",
    title: "Community Service Project",
    overview: "Join our community service initiative to make a positive impact in the local community. This project focuses on helping underserved populations and developing civic responsibility.",
    place: "Local Community Center",
    country: "USA",
    date: new Date("2024-03-20"),
    type: "Community Service",
    contactDetails: "volunteer@scholarship.org",
    poster: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800",
    enrolledCount: 28,
  };

  return (
    <div className="p-6 space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate("/sponsor/opportunities")}
        className="gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Opportunities
      </Button>

      <Card>
        <CardContent className="p-0">
          <img
            src={opportunity.poster}
            alt={opportunity.title}
            className="w-full h-80 object-cover rounded-t-lg"
          />
          <div className="p-6 space-y-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">{opportunity.title}</h1>
                <div className="flex items-center gap-3">
                  <Badge>{opportunity.type}</Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{opportunity.enrolledCount} enrolled</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Overview</h3>
              <p className="text-muted-foreground">{opportunity.overview}</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Opportunity Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
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
                    <p className="font-medium">{opportunity.place}, {opportunity.country}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Contact</p>
                    <p className="font-medium">{opportunity.contactDetails}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SponsorOpportunityDetail;
