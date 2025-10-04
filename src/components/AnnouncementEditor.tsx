import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type Announcement = {
  id: string;
  title: string;
  content: string;
  status: "draft" | "published" | "disappeared";
  publishDate: Date | null;
  disappearDate: Date | null;
};

type AnnouncementEditorProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  announcement: Announcement | null;
  onSave: (announcement: Announcement) => void;
};

export const AnnouncementEditor = ({
  open,
  onOpenChange,
  announcement,
  onSave,
}: AnnouncementEditorProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [disappearDate, setDisappearDate] = useState("");

  useEffect(() => {
    if (announcement) {
      setTitle(announcement.title);
      setContent(announcement.content);
      setDisappearDate(
        announcement.disappearDate
          ? new Date(announcement.disappearDate).toISOString().split("T")[0]
          : ""
      );
    } else {
      setTitle("");
      setContent("");
      setDisappearDate("");
    }
  }, [announcement]);

  const handleSave = (status: "draft" | "published") => {
    const newAnnouncement: Announcement = {
      id: announcement?.id || "",
      title,
      content,
      status,
      publishDate: status === "published" ? new Date() : announcement?.publishDate || null,
      disappearDate: disappearDate ? new Date(disappearDate) : null,
    };
    onSave(newAnnouncement);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {announcement ? "Edit Announcement" : "New Announcement"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter announcement title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="disappear-date">Disappear Date (Optional)</Label>
            <Input
              id="disappear-date"
              type="date"
              value={disappearDate}
              onChange={(e) => setDisappearDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Content</Label>
            <div className="bg-background rounded-md border border-input">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                className="h-64"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-16">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button variant="outline" onClick={() => handleSave("draft")}>
              Save as Draft
            </Button>
            <Button onClick={() => handleSave("published")}>Publish</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
