export async function getBookmarks(tag?: string) {
  const token = localStorage.getItem("accessToken");
  const url = tag
    ? `http://localhost:8000/api/bookmarks/?tag=${tag}`
    : `http://localhost:8000/api/bookmarks`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Something went wrong fetching bookmarks");
  return response.json();
}

export async function createBookmark(
  title: string,
  description: string,
  bookmarkUrl: string,
  imageURL: string,
  tags: string[],
) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`http://localhost:8000/api/bookmarks`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
      url: bookmarkUrl,
      imageURL,
      tags,
    }),
  });
  if (!response.ok) throw new Error("Something went wrong creating bookmark");
  return response.json();
}

export async function updateBookmark(
  id: string,
  description: string,
  title: string,
  bookmarkUrl: string,
  imageURL: string,
  tags: string[],
) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`http://localhost:8000/api/bookmarks/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
      url: bookmarkUrl,
      imageURL,
      tags,
    }),
  });
  if (!response.ok) throw new Error("Something went wrong updating bookmark");
  return response.json();
}

export async function deleteBookmark(id: string) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`http://localhost:8000/api/bookmarks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Something went wrong deleting bookmark");
  return response.json();
}
