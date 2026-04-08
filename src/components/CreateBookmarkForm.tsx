import { useState } from "react";
import { createBookmark } from "../api/bookmarks";
import type { Bookmark } from "../helpers/types";

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
    } catch (err) {
      setError("Failed to create bookmark");
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <h3>This is the create bookmark form</h3>

        <label>Title:</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <label>Description:</label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <label>URL:</label>
        <input
          type="text"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
        />
        <label>Image URL:</label>
        <input
          type="text"
          value={formData.imageURL}
          onChange={(e) =>
            setFormData({ ...formData, imageURL: e.target.value })
          }
        />
        <label>Tags:</label>
        <input
          type="text"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
        />
        <button type="submit">Create Bookmark</button>
      </form>
    </div>
  );
}
