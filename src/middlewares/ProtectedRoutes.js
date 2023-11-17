import { Outlet } from "react-router-dom";
import Login from "../pages/Login";
import { jwtDecode } from "jwt-decode";

export const isAuth = () => {
  const loggedInUser = localStorage.getItem("loggedInUser");

  try {
    return loggedInUser ? jwtDecode(loggedInUser) : null;
  } catch (error) {
    console.error("Errore durante la decodifica del token JWT:", error);
    return null;
  }
};

const ProtectedRoutes = () => {
  const auth = isAuth();

  return auth ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;
