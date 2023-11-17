import React from "react";
import { BrowserRouter as Routes, Route, Router } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import AboutUs from "./pages/AboutUs";
import ProtectedRoutes from "./middlewares/ProtectedRoutes";
import { UserProvider } from "./components/UserContext";
import ProfilePage from "../src/pages/Profile";

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/success" element={<Home />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
        </Router>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
