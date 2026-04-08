import { useEffect, useState } from "react";
import { deleteBookmark, getBookmarks, updateBookmark } from "../api/bookmarks";
import type { Bookmark } from "../helpers/types";
import BookmarkComponent from "../components/Bookmark";
import CreateBookmarkForm from "../components/CreateBookmarkForm";
import { useNavigate } from "react-router-dom";

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [tag, setTag] = useState<string>("");

  useEffect(() => {
    async function fetchBookmarks(tag: string) {
      const data = await getBookmarks(tag);
      setBookmarks(data);
      console.log(data);
    }
    fetchBookmarks(tag);
  }, [tag]);

  async function handleDeleteBookmark(id: string) {
    try {
      await deleteBookmark(id);
      setBookmarks(bookmarks.filter((bookmark) => bookmark._id !== id));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  }

  async function handleUpdateBookmark(
    id: string,
    title: string,
    description: string,
    url: string,
    imageUrl: string,
    tags: string[],
  ) {
    try {
      const updatedBookmark = await updateBookmark(
        id,
        title,
        description,
        url,
        imageUrl,
        tags,
      );
      setBookmarks(
        bookmarks.map((bookmark) =>
          bookmark._id === id ? updatedBookmark : bookmark,
        ),
      );
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  }

  const navigate = useNavigate();

  function handleLogOut() {
    localStorage.removeItem("accessToken");
    navigate("/login");
  }
  return (
    <div>
      <h1>Bookmarks</h1>
      <button
        onClick={() => {
          handleLogOut();
        }}
      >
        Log Out
      </button>
      <label>Filter:</label>
      <input
        type="text"
        placeholder="tag filtering..."
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
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
      <CreateBookmarkForm
        onBookmarkCreated={(newBookmark) =>
          setBookmarks([...bookmarks, newBookmark])
        }
      />
    </div>
  );
}
