import { ApplicantHeader } from "@/components/ApplicantHeader";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, AlertCircle, MapPin, Calendar, Clock, ExternalLink } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

const mockScholarships = [
  {
    id: 1,
    name: "Full Academic Scholarship 2024",
    sponsor: "Tech Foundation",
    country: "United States",
    studyLevel: "Bachelor",
    deadline: "2024-12-31",
    status: "Open",
    coverage: "Full Tuition + Living Expenses"
  },
  {
    id: 2,
    name: "Graduate Research Grant",
    sponsor: "Green Energy Initiative",
    country: "Germany",
    studyLevel: "Master",
    deadline: "2024-11-15",
    status: "Open",
    coverage: "Full Tuition"
  },
  {
    id: 3,
    name: "Medical Sciences Scholarship",
    sponsor: "Health Care Foundation",
    country: "Canada",
    studyLevel: "Bachelor",
    deadline: "2024-10-30",
    status: "Open",
    coverage: "Full Tuition + Stipend"
  }
];

// Mock available time slots for different dates
const mockAvailableSlots = {
  "2025-10-30": [
    {
      id: 1,
      starts_at_utc: "2025-10-30T03:20:00.000000Z",
      ends_at_utc: "2025-10-30T03:50:00.000000Z",
      starts_at_local: "2025-10-30 03:20:00",
      ends_at_local: "2025-10-30 03:50:00",
      starts_at_display: "Oct 30, 2025 3:20 AM",
      ends_at_display: "Oct 30, 2025 3:50 AM",
      duration_min: 30,
      owner_timezone: "Asia/Kuala_Lumpur",
      applicant_timezone: "UTC",
      meeting_url: "https://meet.google.com/abc-defg-hij"
    },
    {
      id: 2,
      starts_at_utc: "2025-10-30T06:00:00.000000Z",
      ends_at_utc: "2025-10-30T06:30:00.000000Z",
      starts_at_local: "2025-10-30 06:00:00",
      ends_at_local: "2025-10-30 06:30:00",
      starts_at_display: "Oct 30, 2025 6:00 AM",
      ends_at_display: "Oct 30, 2025 6:30 AM",
      duration_min: 30,
      owner_timezone: "Asia/Kuala_Lumpur",
      applicant_timezone: "UTC",
      meeting_url: "https://meet.google.com/xyz-uvwx-yz"
    }
  ],
  "2025-10-31": [
    {
      id: 3,
      starts_at_utc: "2025-10-31T04:00:00.000000Z",
      ends_at_utc: "2025-10-31T04:30:00.000000Z",
      starts_at_local: "2025-10-31 04:00:00",
      ends_at_local: "2025-10-31 04:30:00",
      starts_at_display: "Oct 31, 2025 4:00 AM",
      ends_at_display: "Oct 31, 2025 4:30 AM",
      duration_min: 30,
      owner_timezone: "Asia/Kuala_Lumpur",
      applicant_timezone: "UTC",
      meeting_url: "https://meet.google.com/test-meet-url"
    }
  ]
};

const timezones = [
  { value: "UTC", label: "UTC" },
  { value: "Asia/Kuala_Lumpur", label: "Asia/Kuala Lumpur (GMT+8)" },
  { value: "America/New_York", label: "America/New York (EST)" },
  { value: "Europe/London", label: "Europe/London (GMT)" },
  { value: "Asia/Dubai", label: "Asia/Dubai (GMT+4)" },
];

const ApplicantDashboard = () => {
  const navigate = useNavigate();
  const isProfileComplete = false; // Mock - fetch from backend
  const hasActiveApplication = false; // Mock - check if user has pending application
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTimezone, setSelectedTimezone] = useState("UTC");
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [bookedAppointment, setBookedAppointment] = useState<any>(null);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot: any) => {
    setSelectedSlot(slot);
  };

  const handleConfirmBooking = () => {
    if (selectedSlot) {
      setBookedAppointment(selectedSlot);
      setSelectedDate(undefined);
      setSelectedSlot(null);
    }
  };

  const getAvailableSlotsForDate = () => {
    if (!selectedDate) return [];
    const dateKey = format(selectedDate, "yyyy-MM-dd");
    return mockAvailableSlots[dateKey as keyof typeof mockAvailableSlots] || [];
  };

  const availableSlots = getAvailableSlotsForDate();

  return (
    <div className="min-h-screen bg-background">
      <ApplicantHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Meeting Scheduler Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Schedule Your Scholarship Meeting</CardTitle>
            <CardDescription>
              Choose a date and time slot for your scholarship consultation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Booked Appointment Display */}
            {bookedAppointment && (
              <Alert className="border-primary bg-primary/5">
                <Calendar className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-2">
                    <p className="font-semibold">Your Scheduled Meeting</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Date:</span>{" "}
                        <span className="font-medium">{bookedAppointment.starts_at_display.split(",")[0]}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration:</span>{" "}
                        <span className="font-medium">{bookedAppointment.duration_min} minutes</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Start Time:</span>{" "}
                        <span className="font-medium">{bookedAppointment.starts_at_display.split(", ")[1]}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">End Time:</span>{" "}
                        <span className="font-medium">{bookedAppointment.ends_at_display.split(", ")[1]}</span>
                      </div>
                      <div className="md:col-span-2">
                        <span className="text-muted-foreground">Meeting Link:</span>{" "}
                        <a 
                          href={bookedAppointment.meeting_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline inline-flex items-center gap-1"
                        >
                          Join Meeting <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setBookedAppointment(null)}
                      className="mt-2"
                    >
                      Cancel Appointment
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Meeting Scheduler */}
            {!bookedAppointment && (
              <>
                {/* Timezone Selector */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">View times in:</label>
                  <Select value={selectedTimezone} onValueChange={setSelectedTimezone}>
                    <SelectTrigger className="w-full md:w-[300px]">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((tz) => (
                        <SelectItem key={tz.value} value={tz.value}>
                          {tz.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Date Picker */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Date:</label>
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      disabled={(date) => date < new Date()}
                      className="rounded-md border"
                    />
                  </div>

                  {/* Available Slots */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Available Time Slots:</label>
                    {!selectedDate ? (
                      <div className="text-sm text-muted-foreground py-4">
                        Please select a date to view available slots
                      </div>
                    ) : availableSlots.length === 0 ? (
                      <div className="text-sm text-muted-foreground py-4">
                        No available slots for this date
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-[300px] overflow-y-auto">
                        {availableSlots.map((slot) => (
                          <Card
                            key={slot.id}
                            className={`cursor-pointer transition-colors ${
                              selectedSlot?.id === slot.id
                                ? "border-primary bg-primary/5"
                                : "hover:border-primary/50"
                            }`}
                            onClick={() => handleSlotSelect(slot)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <p className="font-medium text-sm">
                                    {slot.starts_at_display.split(", ")[1]} - {slot.ends_at_display.split(", ")[1]}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {slot.duration_min} minutes
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                    
                    {selectedSlot && (
                      <Button 
                        onClick={handleConfirmBooking}
                        className="w-full mt-4"
                      >
                        Confirm Booking
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Available Scholarships</h1>
          <p className="text-muted-foreground">
            Browse and apply for scholarships that match your qualifications
          </p>
        </div>

        {!isProfileComplete && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>Complete your profile to apply for scholarships</span>
              <Button size="sm" onClick={() => navigate("/applicant/profile-completion")}>
                Complete Profile
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {hasActiveApplication && (
          <Alert className="mb-6 border-primary">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You have an active application pending. You cannot apply to another scholarship until this application is processed.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockScholarships.map((scholarship) => (
            <Card key={scholarship.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">{scholarship.status}</Badge>
                  <Badge variant="outline">{scholarship.studyLevel}</Badge>
                </div>
                <CardTitle className="text-xl">{scholarship.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  Full tuition coverage for undergraduate programs
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Sponsor:</span>
                    <span className="font-medium">{scholarship.sponsor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Country:</span>
                    <span className="font-medium">{scholarship.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Deadline:</span>
                    <span className="font-medium">{scholarship.deadline}</span>
                  </div>
                  <div className="pt-2">
                    <span className="text-xs text-muted-foreground">Coverage:</span>
                    <p className="text-sm font-medium">{scholarship.coverage}</p>
                  </div>
                </div>
                <Button 
                  className="w-full"
                  onClick={() => navigate(`/applicant/scholarships/${scholarship.id}`)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ApplicantDashboard;
