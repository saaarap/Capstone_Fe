import React, { useState } from "react";
import AxiosClient from "../clients/clients";
import { jwtDecode } from "jwt-decode";

const client = new AxiosClient();

const AddUser = ({ close }) => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const onChangeSetFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async (avatar) => {
    try {
      const fileData = new FormData();
      fileData.append("avatar", avatar);

      const response = await fetch("http://localhost:4040/users/cloudUpload", {
        method: "POST",
        body: fileData,
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.log(error, "Errore in uploadFile");
      throw error;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      try {
        const uploadAvatar = await uploadFile(file);

        const token = localStorage.getItem("loggedInUser");
        const decoded = jwtDecode(token);

        const finalBody = {
          ...formData,
          avatar: uploadAvatar.avatar,
          author: decoded.id,
        };

        const response = await fetch("http://localhost:4040/users/add", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(finalBody),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("users added:", data);
          close(false);
          window.location.href = "http://localhost:3000/login";
        } else {
          throw new Error("Failed to add post");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Per favore seleziona almeno un file!");
    }
  };

  return (
    <div className="h-screen w-screen fixed top-1/2 flex items-center left-1/2 backdrop-blur-lg transform -translate-y-1/2 -translate-x-1/2 z-30">
      <div className="fixed z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-100 shadow-xl w-fit min-w-[500px] h-fit p-4 rounded-xl hover:scale-110 duration-1000">
        <h1 className="font-bold text-4xl mb-4 text-orange-700 text-center">
          Unisciti a Cucina Compartida!
        </h1>
        <div className="w-full h-fit p-4 rounded-lg flex justify-center items-center">
          <form
            encType="multipart/form-data"
            onSubmit={onSubmit}
            className="flex flex-col justify-center items-center gap-4"
          >
            <input
              className="w-[400px] p-1 rounded"
              placeholder="Username"
              name="userName"
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, userName: e.target.value })
              }
            />
            <input
              placeholder="Email"
              className="w-[400px] p-1 rounded"
              name="email"
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <input
              placeholder="Password"
              className="w-[400px] p-1 rounded"
              name="password"
              type="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <input
              className="w-[400px] p-1 rounded"
              name="Avatar"
              type="file"
              onChange={onChangeSetFile}
            />
            <div className="flex gap-2">
              <button
                onClick={close}
                className="p-2 bg-amber-700 text-white rounded"
              >
                Chiudi
              </button>
              <button
                type="submit"
                className="p-2 bg-green-700 text-white rounded"
              >
                Aggiungi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
