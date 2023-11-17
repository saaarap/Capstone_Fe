import React from "react";
import { Navbar } from "flowbite-react";
import image from "../components/finale.png";
import { Link } from "react-router-dom";
import { useUser } from "../components/UserContext";

const DefaultNavbar = () => {
  const { logout } = useUser();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Sei sicuro di voler uscire?");
    if (confirmLogout) {
      logout();
      window.location.href = "http://localhost:3000/login";
    }
  };

  return (
    <Navbar fluid rounded>
      <Navbar.Brand>
        <img src={image} className="mr-3 h-20" alt="Cucina Compartida Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold">
          Cucina Compartida
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Link to="/profile">Profilo</Link>
        <Link to="/about-us">Chi siamo</Link>
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 15"
          onClick={handleLogout}
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 7.5h11m0 0L8 3.786M12 7.5l-4 3.714M12 1h3c.53 0 1.04.196 1.414.544.375.348.586.82.586 1.313v9.286c0 .492-.21.965-.586 1.313A2.081 2.081 0 0 1 15 14h-3"
          />
        </svg>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default DefaultNavbar;
