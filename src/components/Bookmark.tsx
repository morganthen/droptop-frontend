import { useState } from "react";
import type { Bookmark } from "../helpers/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type BookmarkProps = Bookmark & {
  onDelete?: (id: string) => void;
  onUpdate?: (
    id: string, title: string, description: string,
    url: string, imageURL: string, tags: string[],
  ) => void;
};

export default function Bookmark({
  _id, title, description, url, imageURL, tags, onDelete, onUpdate,
}: BookmarkProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    title, description, url, imageURL,
    tags: tags.join(", "),
  });

  return (
    <Card className="flex flex-col justify-between border border-border shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="pt-5 space-y-3">
        {!isEdit ? (
          <>
            {imageURL && (
              <img
                src={imageURL}
                alt={title}
                className="w-full h-36 object-cover rounded-md"
              />
            )}
            <h2 className="font-semibold text-foreground leading-snug">{title}</h2>
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
            )}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline underline-offset-4 truncate block"
            >
              {url}
            </a>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {tags.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="text-xs bg-accent/20 text-accent-foreground px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="space-y-3">
            <div className="space-y-1">
              <Label>Title</Label>
              <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            </div>
            <div className="space-y-1">
              <Label>Description</Label>
              <Input value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            </div>
            <div className="space-y-1">
              <Label>URL</Label>
              <Input value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} />
            </div>
            <div className="space-y-1">
              <Label>Image URL</Label>
              <Input value={formData.imageURL} onChange={(e) => setFormData({ ...formData, imageURL: e.target.value })} />
            </div>
            <div className="space-y-1">
              <Label>Tags (comma separated)</Label>
              <Input value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} />
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-2 pt-2 pb-4 px-5">
        {!isEdit ? (
          <>
            <Button variant="outline" size="sm" onClick={() => setIsEdit(true)} className="flex-1">
              Edit
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete && onDelete(_id)} className="flex-1">
              Delete
            </Button>
          </>
        ) : (
          <>
            <Button size="sm" onClick={() => {
              if (onUpdate) {
                onUpdate(_id, formData.title, formData.description, formData.url, formData.imageURL,
                  formData.tags.split(",").map((t) => t.trim()));
              }
              setIsEdit(false);
            }} className="flex-1">
              Save
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsEdit(false)} className="flex-1">
              Cancel
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}