import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import image from "../components/finale.png";
import AddUser from "../components/AddUser";
import { useUser } from "../components/UserContext";

const Login = () => {
  const [loginData, setLoginData] = useState({});
  const [showAddUser, setShowAddUser] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useUser();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const userInfo = await login();
      const response = await fetch(`http://localhost:4040/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("loggedInUser", JSON.stringify(data.token));
        navigate("/home");
      } else {
        setError("Email o password errate. Riprova.");
      }
    } catch (error) {
      console.error("Errore durante il login:", error);
    }
  };

  const redirectForLoginWithGithub = () => {
    window.location.href = `http://localhost:4040/auth/github`;
  };

  const toggleAddUserForm = () => {
    setShowAddUser(!showAddUser);
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <img src={image} alt="Logo" />
      {error && <div className="text-red-500 text-center">{error}</div>}
      <form className="space-y-6" onSubmit={onSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              onChange={handleInputChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              onChange={handleInputChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <Button
            type="submit"
            className="w-full mb-1 bg-indigo-600 text-black rounded"
          >
            Accedi
          </Button>
        </div>
      </form>

      <Button
        className="w-full mt-1 bg-indigo-600 text-black rounded"
        onClick={redirectForLoginWithGithub}
      >
        Accedi con Github
      </Button>

      <Button
        className="w-full mt-2 bg-green-500 text-black rounded"
        onClick={toggleAddUserForm}
      >
        Registra Utente
      </Button>

      {showAddUser && <AddUser close={toggleAddUserForm} />}
    </div>
  );
};

export default Login;
