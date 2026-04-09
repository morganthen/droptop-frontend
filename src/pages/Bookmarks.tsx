import { useEffect, useState } from "react";
import { deleteBookmark, getBookmarks, updateBookmark } from "../api/bookmarks";
import type { Bookmark } from "../helpers/types";
import BookmarkComponent from "../components/Bookmark";
import CreateBookmarkForm from "../components/CreateBookmarkForm";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [tag, setTag] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBookmarks(tag: string) {
      const data = await getBookmarks(tag);
      setBookmarks(data);
    }
    fetchBookmarks(tag);
  }, [tag]);

  async function handleDeleteBookmark(id: string) {
    try {
      await deleteBookmark(id);
      setBookmarks(bookmarks.filter((bookmark) => bookmark._id !== id));
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("An unknown error occurred");
    }
  }

  async function handleUpdateBookmark(
    id: string,
    title: string,
    description: string,
    url: string,
    imageURL: string,
    tags: string[],
  ) {
    try {
      const updatedBookmark = await updateBookmark(
        id,
        title,
        description,
        url,
        imageURL,
        tags,
      );
      setBookmarks(bookmarks.map((b) => (b._id === id ? updatedBookmark : b)));
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("An unknown error occurred");
    }
  }

  function handleLogOut() {
    localStorage.removeItem("accessToken");
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🔖</span>
          <h1 className="text-xl font-semibold text-foreground">Droptop</h1>
        </div>
        <Button
          variant="ghost"
          onClick={handleLogOut}
          className="text-muted-foreground hover:text-foreground"
        >
          Log out
        </Button>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Filter */}
        <div className="flex items-center gap-3">
          <Input
            type="text"
            placeholder="Filter by tag..."
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="max-w-xs"
          />
          {tag && (
            <button
              onClick={() => setTag("")}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
          )}
        </div>

        {error && (
          <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">
            {error}
          </p>
        )}

        {/* Bookmark grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookmarks.map((bookmark) => (
            <BookmarkComponent
              key={bookmark._id}
              _id={bookmark._id}
              title={bookmark.title}
              description={bookmark.description}
              url={bookmark.url}
              imageURL={bookmark.imageURL}
              tags={bookmark.tags}
              onDelete={handleDeleteBookmark}
              onUpdate={handleUpdateBookmark}
            />
          ))}
        </div>

        {/* Create form */}
        <CreateBookmarkForm
          onBookmarkCreated={(newBookmark) =>
            setBookmarks([...bookmarks, newBookmark])
          }
        />
      </main>
    </div>
  );
}
