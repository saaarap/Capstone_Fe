import React, { useState } from "react";
import { useUser } from "../components/UserContext";
import { Card, Button } from "flowbite-react";
import MainLayout from "../layouts/Main";
import AxiosClient from "../clients/clients";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { loggedInUser } = useUser();
  const [editedUserName, setEditedUserName] = useState(loggedInUser.userName);
  const [isEditing, setIsEditing] = useState(false);
  const client = new AxiosClient();

  const handleEditProfile = async () => {
    try {
      const response = await client.patch(`/users/up/${loggedInUser.id}`, {
        userName: editedUserName,
      });

      if (response.status === 200) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-center mb-5">
        <Link to="/home">
          <svg
            className="w-8 h-8 items-center justify-center cursor-pointer"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 8v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1V8M1 10l9-9 9 9"
            />
          </svg>
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <Card
          className="max-w-sm border-0 flex items-center justify-center shadow-none"
          imgAlt="Meaningful alt text for an image that is not purely decorative"
          imgSrc={loggedInUser.avatar}
        >
          {isEditing ? (
            <div className="flex items-center justify-center h-full">
              <input
                className="mb-2"
                value={editedUserName}
                onChange={(e) => setEditedUserName(e.target.value)}
              />
              <Button onClick={handleEditProfile}>Salva Modifiche</Button>
            </div>
          ) : (
            <div>
              <h5 className="font-bold tracking-tight text-gray-900 dark:text-white">
                {loggedInUser.userName}
              </h5>
              <Button onClick={() => setIsEditing(true)}>
                Modifica Nome Utente
              </Button>
            </div>
          )}
        </Card>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
