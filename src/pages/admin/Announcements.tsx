import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Send } from "lucide-react";
import { AnnouncementEditor } from "@/components/AnnouncementEditor";
import { format } from "date-fns";

type Announcement = {
  id: string;
  title: string;
  content: string;
  status: "draft" | "published" | "disappeared";
  publishDate: Date | null;
  disappearDate: Date | null;
};

const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Scholarship Application Deadline Extended",
    content: "<p>We are pleased to announce that the scholarship application deadline has been extended to March 31st.</p>",
    status: "published",
    publishDate: new Date("2024-01-15"),
    disappearDate: new Date("2024-03-31"),
  },
  {
    id: "2",
    title: "New Sponsor Partnership",
    content: "<p>We have partnered with Tech Foundation to offer 10 new scholarships for computer science students.</p>",
    status: "published",
    publishDate: new Date("2024-01-20"),
    disappearDate: new Date("2024-06-30"),
  },
  {
    id: "3",
    title: "Holiday Notice",
    content: "<p>Our offices will be closed during the holiday season.</p>",
    status: "disappeared",
    publishDate: new Date("2023-12-20"),
    disappearDate: new Date("2024-01-05"),
  },
  {
    id: "4",
    title: "Upcoming Webinar",
    content: "<p>Join us for a webinar on scholarship application tips.</p>",
    status: "draft",
    publishDate: null,
    disappearDate: null,
  },
];

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);

  const handleDelete = (id: string) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
  };

  const handlePublish = (id: string) => {
    setAnnouncements(
      announcements.map((a) =>
        a.id === id
          ? { ...a, status: "published" as const, publishDate: new Date() }
          : a
      )
    );
  };

  const handleRePublish = (id: string) => {
    setAnnouncements(
      announcements.map((a) =>
        a.id === id
          ? {
              ...a,
              status: "published" as const,
              publishDate: new Date(),
              disappearDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            }
          : a
      )
    );
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setIsEditorOpen(true);
  };

  const handleSave = (announcement: Announcement) => {
    if (editingAnnouncement) {
      setAnnouncements(
        announcements.map((a) => (a.id === announcement.id ? announcement : a))
      );
    } else {
      setAnnouncements([...announcements, { ...announcement, id: Date.now().toString() }]);
    }
    setIsEditorOpen(false);
    setEditingAnnouncement(null);
  };

  const getStatusBadge = (status: Announcement["status"]) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-500">Published</Badge>;
      case "draft":
        return <Badge variant="secondary">Draft</Badge>;
      case "disappeared":
        return <Badge variant="outline">Disappeared</Badge>;
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Announcements</h1>
          <p className="text-muted-foreground">Manage platform announcements</p>
        </div>
        <Button onClick={() => setIsEditorOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Announcement
        </Button>
      </div>

      <div className="bg-card rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Publish Date</TableHead>
              <TableHead>Disappear Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {announcements.map((announcement) => (
              <TableRow key={announcement.id}>
                <TableCell className="font-medium">{announcement.title}</TableCell>
                <TableCell>{getStatusBadge(announcement.status)}</TableCell>
                <TableCell>
                  {announcement.publishDate
                    ? format(announcement.publishDate, "MMM dd, yyyy")
                    : "-"}
                </TableCell>
                <TableCell>
                  {announcement.disappearDate
                    ? format(announcement.disappearDate, "MMM dd, yyyy")
                    : "-"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {announcement.status === "draft" && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(announcement)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePublish(announcement.id)}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    {announcement.status === "disappeared" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRePublish(announcement.id)}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    )}
                    {announcement.status === "published" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(announcement)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(announcement.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AnnouncementEditor
        open={isEditorOpen}
        onOpenChange={setIsEditorOpen}
        announcement={editingAnnouncement}
        onSave={handleSave}
      />
    </div>
  );
};

export default Announcements;
