import React, { useState, useEffect } from "react";
import { Card, Button, Avatar, Textarea } from "flowbite-react";
import AxiosClient from "../clients/clients";
import { useUser } from "./UserContext";

const PostCard = (props) => {
  const { loggedInUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const {
    cover,
    title,
    content,
    author,
    authorAvatar,
    postId,
    onDelete,
    onUpdate,
  } = props;
  const client = new AxiosClient();

  const getComments = async (postId) => {
    try {
      const response = await client.get(
        `http://localhost:4040/comment/${postId}`
      );

      setComments(response.comments);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddComment = async () => {
    try {
      if (!loggedInUser || !loggedInUser.id) {
        console.error(
          "Impossibile ottenere le informazioni dell'utente loggato."
        );
        return;
      }

      const response = await client.post(
        `http://localhost:4040/comment/create/${postId}`,
        {
          comments: newComment,
          authorId: loggedInUser.id,
          authorCommentUsername: loggedInUser.userName,
          authorCommentAvatar: loggedInUser.avatar,
        }
      );

      console.log(response);

      if (response.status === 201) {
        setNewComment("");
        setComments((prevComments) => [response.payload, ...prevComments]);
        window.location.href = "http://localhost:3000/home";
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getComments(postId);
  }, [postId]);

  const handleDelete = async () => {
    const client = new AxiosClient();

    try {
      const response = await client.delete(`/posts/delete/${postId}`);

      if (response.status === 200) {
        onDelete(postId);
      } else {
        window.location.href = "http://localhost:3000/home";
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    const client = new AxiosClient();

    try {
      const response = await client.patch(`/posts/update/${postId}`, {
        content: editedContent,
      });

      if (response.status === 200) {
        onUpdate(postId);
        setIsEditing(false);
      } else {
        window.location.href = "http://localhost:3000/home";
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  const handleDeleteComment = (commentId) => {
    const confirmDelete = window.confirm(
      "Sei sicuro di voler eliminare questo commento?"
    );

    if (confirmDelete) {
      deleteComment(commentId);
    }
  };

  const deleteComment = async (commentId) => {
    const client = new AxiosClient();

    try {
      const response = await client.delete(`/comment/delete/${commentId}`);

      if (response.statusCode === 200) {
        getComments(postId);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card
      className="max-w-sm m-5 border-0 card-height"
      imgSrc={cover}
      style={{ height: "200x200" }}
    >
      <h5 className="text-l font-bold text-gray-900">{title}</h5>

      {isEditing ? (
        <div>
          <div className="text-center mb-3">
            <Textarea
              className="max-w-full"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          </div>
          <div className="text-center">
            <Button.Group>
              <Button className="border-0" onClick={handleSaveEdit}>
                Salva Modifiche
              </Button>
              <Button className="border-0" onClick={handleCloseEdit}>
                Annulla Modifiche
              </Button>
            </Button.Group>
          </div>
        </div>
      ) : (
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {content}
        </p>
      )}

      <div className="flex items-center mb-4">
        <Avatar img={authorAvatar} rounded alt={`${author}'s Avatar`} />
        <div className="font-medium dark:text-white ml-2">{author}</div>
      </div>
      <div>
        {comments.map((comment) => (
          <div key={comment._id} className="flex items-center mb-4">
            <div className="flex items-center">
              <Avatar
                img={comment.authorId.avatar}
                rounded
                alt={`${comment.authorId.userName}'s Avatar`}
              />
              <p className="ml-2">{comment.comments}</p>
            </div>
            <div className="ml-auto">
              <svg
                className="w-4 h-4 text-gray-800 dark:text-white cursor-pointer"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 20"
                onClick={() => handleDeleteComment(comment._id)}
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <div>
        <Textarea
          className="max-w-full mb-2"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button onClick={handleAddComment}>Aggiungi Commento</Button>
      </div>

      <div className="flex items-center space-x-4">
        <svg
          className="w-4 h-4 text-gray-800 dark:text-white cursor-pointer"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 20"
          onClick={handleDelete}
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
          />
        </svg>
        <svg
          className="w-4 h-4 text-gray-800 dark:text-white cursor-pointer"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
          onClick={handleEdit}
        >
          <path d="m13.835 7.578-.005.007-7.137 7.137 2.139 2.138 7.143-7.142-2.14-2.14Zm-10.696 3.59 2.139 2.14 7.138-7.137.007-.005-2.141-2.141-7.143 7.143Zm1.433 4.261L2 12.852.051 18.684a1 1 0 0 0 1.265 1.264L7.147 18l-2.575-2.571Zm14.249-14.25a4.03 4.03 0 0 0-5.693 0L11.7 2.611 17.389 8.3l1.432-1.432a4.029 4.029 0 0 0 0-5.689Z" />
        </svg>
      </div>
    </Card>
  );
};

export default PostCard;
