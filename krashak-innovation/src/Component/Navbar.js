import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assests/assests";
import { MdMenu } from "react-icons/md";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar({ islogin, setUserSidebar }) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`fixed-navbar ${isScrolled ? "scrolled" : ""}`}>
      <Link to="/">
        <img src={assets.logo} className="logo" alt="" width="120" />
      </Link>

      <ul className="nav">
        <NavLink to="/" className="nav_li ">
          <p>Home</p>
        </NavLink>
        <NavLink to="/about" className="nav_li">
          <p>About </p>
        </NavLink>
        <NavLink to="/testing" className="nav_li">
          <p>Testing</p>
        </NavLink>
        <NavLink to="/register" className="nav_li">
          <p>Booking</p>
        </NavLink>
        <NavLink to="/controller" className="nav_li">
          <p>Controller</p>
        </NavLink>
      </ul>

      <div className="button">
        {islogin ? (
          <button
            className=" btn userIcon"
            onClick={() => setUserSidebar(true)}
          >
            Profile <FaUser className="icon" />
          </button>
        ) : (
          <button className="btn" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>

      <div onClick={() => setVisible(true)} className="menu_icon">
        <MdMenu />
      </div>

      {/* SideBar Navigation for Responsiveness */}

      <div className={` sidebar ${visible ? "w-full" : "w-0"}`}>
        <div onClick={() => setVisible(false)} className="sidebar_heading">
          <FaAngleLeft className="icon" />
          <p>Back</p>
        </div>

        <div className="sidebar_Nav ">
          <NavLink onClick={() => setVisible(false)} className="link" to="/">
            Home
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="link"
            to="/about"
          >
            About
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="link"
            to="/testing"
          >
            Testing
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="link"
            to="/register"
          >
            Booking
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="link"
            to="/chat"
          >
            ChatBot
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="link"
            to="/controller"
          >
            Controller
          </NavLink>

          {islogin ? (
            <NavLink
              onClick={() => {
                setUserSidebar(true);
                setVisible(false);
              }}
              className="link"
            >
              Profile
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setVisible(false)}
              className="link"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
