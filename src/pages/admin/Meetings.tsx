import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon, Clock, Plus, Trash2, Users } from "lucide-react";
import { format } from "date-fns";

type TimeSlot = {
  id: number;
  time: string;
  meetingLink: string;
  isBooked: boolean;
  studentName?: string;
  studentEmail?: string;
  studentPhone?: string;
};

type MeetingDay = {
  date: Date;
  slots: TimeSlot[];
};

const Meetings = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [meetingDays, setMeetingDays] = useState<MeetingDay[]>([
    {
      date: new Date(2025, 9, 15),
      slots: [
        { id: 1, time: "09:00", meetingLink: "https://meet.google.com/abc-defg-hij", isBooked: true, studentName: "Ahmed Ali", studentEmail: "ahmed@email.com", studentPhone: "+966501234567" },
        { id: 2, time: "09:30", meetingLink: "https://meet.google.com/abc-defg-hij", isBooked: false },
        { id: 3, time: "10:00", meetingLink: "https://meet.google.com/abc-defg-hij", isBooked: false },
      ]
    }
  ]);
  
  const [isAddSlotOpen, setIsAddSlotOpen] = useState(false);
  const [slotStartTime, setSlotStartTime] = useState("09:00");
  const [slotEndTime, setSlotEndTime] = useState("12:00");
  const [slotDuration, setSlotDuration] = useState<number>(30);
  const [meetingLink, setMeetingLink] = useState("");
  const [customSlotTime, setCustomSlotTime] = useState("");

  const selectedDayData = meetingDays.find(
    day => selectedDate && format(day.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  );

  const generateTimeSlots = () => {
    if (!selectedDate || !slotStartTime || !slotEndTime || !meetingLink) return;

    const slots: TimeSlot[] = [];
    const [startHour, startMin] = slotStartTime.split(':').map(Number);
    const [endHour, endMin] = slotEndTime.split(':').map(Number);
    
    let currentTime = startHour * 60 + startMin;
    const endTime = endHour * 60 + endMin;
    let idCounter = Date.now();

    while (currentTime < endTime) {
      const hour = Math.floor(currentTime / 60).toString().padStart(2, '0');
      const min = (currentTime % 60).toString().padStart(2, '0');
      slots.push({
        id: idCounter++,
        time: `${hour}:${min}`,
        meetingLink,
        isBooked: false
      });
      currentTime += slotDuration;
    }

    const existingDayIndex = meetingDays.findIndex(
      day => format(day.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
    );

    if (existingDayIndex >= 0) {
      const updatedDays = [...meetingDays];
      updatedDays[existingDayIndex].slots = [...updatedDays[existingDayIndex].slots, ...slots];
      setMeetingDays(updatedDays);
    } else {
      setMeetingDays([...meetingDays, { date: selectedDate, slots }]);
    }

    setIsAddSlotOpen(false);
    setSlotStartTime("09:00");
    setSlotEndTime("12:00");
    setMeetingLink("");
  };

  const addCustomSlot = () => {
    if (!selectedDate || !customSlotTime || !meetingLink) return;

    const newSlot: TimeSlot = {
      id: Date.now(),
      time: customSlotTime,
      meetingLink,
      isBooked: false
    };

    const existingDayIndex = meetingDays.findIndex(
      day => format(day.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
    );

    if (existingDayIndex >= 0) {
      const updatedDays = [...meetingDays];
      updatedDays[existingDayIndex].slots.push(newSlot);
      setMeetingDays(updatedDays);
    } else {
      setMeetingDays([...meetingDays, { date: selectedDate, slots: [newSlot] }]);
    }

    setCustomSlotTime("");
    setMeetingLink("");
    setIsAddSlotOpen(false);
  };

  const deleteSlot = (slotId: number) => {
    if (!selectedDate) return;

    const updatedDays = meetingDays.map(day => {
      if (format(day.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')) {
        return {
          ...day,
          slots: day.slots.filter(slot => slot.id !== slotId)
        };
      }
      return day;
    }).filter(day => day.slots.length > 0);

    setMeetingDays(updatedDays);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Meeting Slots Management</h1>
          <p className="text-muted-foreground">Set up available time slots for student meetings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Select Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              modifiers={{
                booked: meetingDays.map(d => d.date)
              }}
              modifiersClassNames={{
                booked: "bg-primary/10 font-bold"
              }}
            />
            <div className="mt-4 p-3 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">
                Dates with slots are highlighted
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Time Slots */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Time Slots</CardTitle>
                <CardDescription>
                  {selectedDate ? format(selectedDate, 'MMMM dd, yyyy') : 'Select a date'}
                </CardDescription>
              </div>
              <Dialog open={isAddSlotOpen} onOpenChange={setIsAddSlotOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Slots
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Time Slots</DialogTitle>
                    <DialogDescription>
                      Create slots automatically or add a custom time
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div>
                      <Label>Meeting Link</Label>
                      <Input
                        placeholder="https://meet.google.com/..."
                        value={meetingLink}
                        onChange={(e) => setMeetingLink(e.target.value)}
                      />
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-3">Generate Slots</h4>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <Label>Start Time</Label>
                          <Input
                            type="time"
                            value={slotStartTime}
                            onChange={(e) => setSlotStartTime(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>End Time</Label>
                          <Input
                            type="time"
                            value={slotEndTime}
                            onChange={(e) => setSlotEndTime(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Slot Duration</Label>
                        <Select 
                          value={slotDuration.toString()} 
                          onValueChange={(value) => setSlotDuration(Number(value))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">60 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full mt-3" onClick={generateTimeSlots}>
                        Generate Slots
                      </Button>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-3">Or Add Custom Slot</h4>
                      <Label>Time</Label>
                      <Input
                        type="time"
                        value={customSlotTime}
                        onChange={(e) => setCustomSlotTime(e.target.value)}
                      />
                      <Button className="w-full mt-3" variant="secondary" onClick={addCustomSlot}>
                        Add Custom Slot
                      </Button>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddSlotOpen(false)}>
                      Close
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {!selectedDate ? (
              <div className="text-center py-12 text-muted-foreground">
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a date to view or add time slots</p>
              </div>
            ) : !selectedDayData || selectedDayData.slots.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No slots available for this date</p>
                <Button className="mt-4" onClick={() => setIsAddSlotOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Time Slots
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Student Info</TableHead>
                    <TableHead>Meeting Link</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedDayData.slots.map((slot) => (
                    <TableRow key={slot.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {slot.time}
                        </div>
                      </TableCell>
                      <TableCell>
                        {slot.isBooked ? (
                          <Badge variant="secondary">
                            <Users className="h-3 w-3 mr-1" />
                            Booked
                          </Badge>
                        ) : (
                          <Badge variant="outline">Available</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {slot.isBooked ? (
                          <div className="text-sm">
                            <p className="font-medium">{slot.studentName}</p>
                            <p className="text-muted-foreground">{slot.studentEmail}</p>
                            <p className="text-muted-foreground">{slot.studentPhone}</p>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <a
                          href={slot.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm"
                        >
                          View Link
                        </a>
                      </TableCell>
                      <TableCell className="text-right">
                        {!slot.isBooked && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteSlot(slot.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Meetings;
