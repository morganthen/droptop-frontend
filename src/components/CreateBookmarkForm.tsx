import { useState } from "react";
import { createBookmark } from "../api/bookmarks";
import type { Bookmark } from "../helpers/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateBookmarkForm({
  onBookmarkCreated,
}: {
  onBookmarkCreated: (bookmark: Bookmark) => void;
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    imageURL: "",
    tags: "",
  });
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await createBookmark(
        formData.title,
        formData.description,
        formData.url,
        formData.imageURL,
        formData.tags.split(",").map((tag) => tag.trim()),
      );
      onBookmarkCreated(result);
      setFormData({
        title: "",
        description: "",
        url: "",
        imageURL: "",
        tags: "",
      });
      setOpen(false);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong");
    }
  };

  if (!open) {
    return (
      <Button onClick={() => setOpen(true)} className="w-full sm:w-auto">
        + Add Bookmark
      </Button>
    );
  }

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-foreground">
          New Bookmark
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          {error && (
            <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">
              {error}
            </p>
          )}
          <div className="space-y-1">
            <Label>Title</Label>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div className="space-y-1">
            <Label>Description</Label>
            <Input
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div className="space-y-1">
            <Label>URL</Label>
            <Input
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
            />
          </div>
          <div className="space-y-1">
            <Label>Image URL</Label>
            <Input
              value={formData.imageURL}
              onChange={(e) =>
                setFormData({ ...formData, imageURL: e.target.value })
              }
            />
          </div>
          <div className="space-y-1">
            <Label>Tags (comma separated)</Label>
            <Input
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
            />
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="submit" className="flex-1">
              Save
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
