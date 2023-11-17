import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(getLoggedInUser());

  function getLoggedInUser() {
    const token = localStorage.getItem("loggedInUser");
    if (token) {
      const decoded = jwtDecode(token);
      return {
        id: decoded.id,
        userName: decoded.userName,
        avatar: decoded.avatar,
      };
    }
    return {};
  }

  const login = (token) => {
    try {
      const decoded = jwtDecode(token);
      setLoggedInUser({
        id: decoded.id,
        userName: decoded.userName,
        avatar: decoded.avatar,
      });
      localStorage.setItem("loggedInUser", token);
    } catch (error) {
      console.error("Errore durante la decodifica del token:", error);
    }
  };
  const logout = () => {
    setLoggedInUser({});
    localStorage.removeItem("loggedInUser");
  };

  return (
    <UserContext.Provider value={{ loggedInUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
