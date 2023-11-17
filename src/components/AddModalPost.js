import React, { useState } from "react";
import AxiosClient from "../clients/clients";
import { jwtDecode } from "jwt-decode";

const client = new AxiosClient();

const AddPostModal = ({ close }) => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "" });

  const onChangeSetFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async (cover) => {
    try {
      const fileData = new FormData();
      fileData.append("cover", cover);

      const response = await fetch("http://localhost:4040/posts/cloudUpload", {
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
        const uploadCover = await uploadFile(file);

        const token = localStorage.getItem("loggedInUser");
        const decoded = jwtDecode(token);
        const urlParams = new URLSearchParams(window.location.search);
        const githubToken = urlParams.get("token");

        if (githubToken) {
          localStorage.setItem("githubToken", githubToken);
        }

        const finalBody = {
          ...formData,
          cover: uploadCover.cover,
          author: decoded.id,
        };

        const response = await fetch("http://localhost:4040/posts/create", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(finalBody),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Post added:", data);
          close(false);
          window.location.href = "http://localhost:3000/home";
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
          Crea il tuo post!
        </h1>
        <div className="w-full h-fit p-4 rounded-lg flex justify-center items-center">
          <form
            encType="multipart/form-data"
            onSubmit={onSubmit}
            className="flex flex-col justify-center items-center gap-4"
          >
            <input
              className="w-[400px] p-1 rounded"
              placeholder="Titolo"
              name="Titolo"
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <input
              placeholder="Descrizione"
              className="w-[400px] p-1 rounded"
              name="Descrizione"
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
            />
            <input
              className="w-[400px] p-1 rounded"
              name="cover"
              type="file"
              onChange={onChangeSetFile}
            />
            <div className="flex gap-2">
              <button
                onClick={() => close(false)}
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

export default AddPostModal;
