import { useState } from "react";
import type { Bookmark } from "../helpers/types";

type BookmarkProps = Bookmark & {
  onDelete?: (id: string) => void;
  onUpdate?: (
    id: string,
    title: string,
    description: string,
    url: string,
    imageURL: string,
    tags: string[],
  ) => void;
};

export default function Bookmark({
  _id,
  title,
  description,
  url,
  imageURL,
  tags,
  onDelete,
  onUpdate,
}: BookmarkProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    title,
    description,
    url,
    imageURL,
    tags: tags.join(", "),
  });
  return (
    <div key={_id}>
      {/*title*/}
      {!isEdit && <h2>{title}</h2>}
      {isEdit && (
        <div>
          <label>Title</label>
          <input
            placeholder={title}
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
      )}

      {/*description*/}
      {!isEdit && description && <p>{description}</p>}
      {isEdit && (
        <div>
          <label>Description</label>
          <input
            placeholder={description}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
      )}
      {/*imageUrl*/}
      {!isEdit && imageURL && <img src={imageURL} alt={title} />}
      {isEdit && (
        <div>
          <label>Image URL</label>
          <input
            placeholder={imageURL}
            value={formData.imageURL}
            onChange={(e) =>
              setFormData({ ...formData, imageURL: e.target.value })
            }
          />
        </div>
      )}
      {/*Url*/}
      {!isEdit && (
        <a href={url} target="_blank" rel="noopener noreferrer">
          Visit Bookmark
        </a>
      )}
      {isEdit && (
        <div>
          <label>URL</label>
          <input
            placeholder={url}
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          />
        </div>
      )}
      {/*Tags*/}
      {!isEdit && (
        <div>
          {tags.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </div>
      )}
      {isEdit && (
        <div>
          <label>Tags (comma separated)</label>
          <input
            placeholder={tags.join(", ")}
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          />
        </div>
      )}
      <button onClick={() => onDelete && onDelete(_id)}>Delete</button>
      <button onClick={() => setIsEdit(!isEdit)}>Edit</button>
      {isEdit && (
        <button
          onClick={() => {
            if (onUpdate) {
              onUpdate(
                _id,
                formData.title,
                formData.description,
                formData.url,
                formData.imageURL,
                formData.tags.split(",").map((tag) => tag.trim()),
              );
            }
            setIsEdit(false);
          }}
        >
          Save
        </button>
      )}
    </div>
  );
}
