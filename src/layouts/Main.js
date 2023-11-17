import React from "react";
import MyNavbar from "../components/Navbar";
import MyFooter from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="h-screen">
      <MyNavbar />
      {children}
      <MyFooter />
    </div>
  );
};

export default MainLayout;
