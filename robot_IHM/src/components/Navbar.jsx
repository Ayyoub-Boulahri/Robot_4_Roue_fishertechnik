import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const baseStyle =
    "text-green-400 font-mono font-semibold px-5 py-3 rounded-md transition-all duration-200";
  const activeStyle =
    "bg-green-700 border border-green-600 shadow-inner";

  return (
    <nav className="bg-black backdrop-blur-md shadow-inner px-8 py-4 flex justify-center space-x-6 border-b border-green-600 z-20">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${baseStyle} ${
            isActive
              ? activeStyle
              : "hover:bg-green-600 hover:text-green-100"
          }`
        }
      >
        Control
      </NavLink>

      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `${baseStyle} ${
            isActive
              ? activeStyle
              : "hover:bg-green-600 hover:text-green-100"
          }`
        }
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/live-data"
        className={({ isActive }) =>
          `${baseStyle} ${
            isActive
              ? activeStyle
              : "hover:bg-green-600 hover:text-green-100"
          }`
        }
      >
        Live Data
      </NavLink>
    </nav>
  );
};

export default Navbar;
