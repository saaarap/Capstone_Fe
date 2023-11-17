import React, { useState } from "react";

const EditPost = ({ postId, onUpdate }) => {
  const [editedPost, setEditedPost] = useState("");

  const handleUpdatePost = async () => {
    try {
      const response = await fetch(
        `http://localhost:4040/posts/update/${postId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: editedPost }),
        }
      );

      if (response.ok) {
        onUpdate();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        placeholder="Descrizione"
        className="max-w-full"
        name="Descrizione"
        type="text"
        value={editedPost}
        onChange={(e) => setEditedPost(e.target.value)}
      />
      <button onClick={handleUpdatePost}>Salva modifiche</button>
    </div>
  );
};

export default EditPost;
