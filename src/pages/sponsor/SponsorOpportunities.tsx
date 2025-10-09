import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Calendar, MapPin, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

type Opportunity = {
  id: string;
  title: string;
  place: string;
  country: string;
  date: Date;
  type: string;
  enrolledCount: number;
};

// Mock opportunities for sponsor's students
const mockOpportunities: Opportunity[] = [
  {
    id: "1",
    title: "Community Service Project",
    place: "Local Community Center",
    country: "USA",
    date: new Date("2024-03-20"),
    type: "Community Service",
    enrolledCount: 28,
  },
  {
    id: "2",
    title: "Environmental Campaign",
    place: "City Park",
    country: "UK",
    date: new Date("2024-04-15"),
    type: "Environmental",
    enrolledCount: 35,
  },
];

const SponsorOpportunities = () => {
  const navigate = useNavigate();

  const handleViewDetails = (id: string) => {
    navigate(`/sponsor/opportunities/${id}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Volunteering Opportunities</h1>
        <p className="text-muted-foreground mt-1">
          View volunteering opportunities for your sponsored students (Read-only)
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Opportunities ({mockOpportunities.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Enrolled</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOpportunities.map((opportunity) => (
                <TableRow key={opportunity.id}>
                  <TableCell className="font-medium">{opportunity.title}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {opportunity.country}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {format(opportunity.date, "MMM dd, yyyy")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{opportunity.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {opportunity.enrolledCount}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetails(opportunity.id)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SponsorOpportunities;
