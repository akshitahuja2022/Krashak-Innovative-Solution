import React from "react";
import { assets } from "../assests/assests";
import "./Footer.css";
import { NavLink } from "react-router-dom";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
function Footer() {
  return (
    <div className="footer_container">
      <div className="footer_content">
        <div className="footer_logo">
          <img src={assets.logo} alt="" width="120px" />
          <p>
            We are committed to revolutionizing agriculture by giving farmers
            the tools they need to optimize soil health and boost crop
            productivity.
          </p>
        </div>

        <div className="footer_nav">
          <p>Company</p>
          <ul className="nav">
            <NavLink to="/" className="nav_link">
              Home
            </NavLink>
            <NavLink to="/about" className="nav_link">
              About
            </NavLink>
            <NavLink to="/testing" className="nav_link">
              Testing
            </NavLink>
            <NavLink to="/" className="nav_link">
              Privacy policy
            </NavLink>
          </ul>
        </div>

        <div className="footer_contact">
          <p>GET IN TOUCH</p>
          <ul className=" footer_contactlist">
            <NavLink to="/" className="list">
              +91 63502 91328
            </NavLink>
            <NavLink to="/" className="list">
              {" "}
              +91 73078 13301
            </NavLink>
            <NavLink to="/" className="list">
              krashakinnovativesolutions@gmail.com
            </NavLink>
          </ul>

          <div className="footer_social">
            <ul className="social_link">
              <NavLink to="https://www.youtube.com/channel/UCTitp5bMsIRAedl1zans2fw">
                <FaYoutube className="icon" color="red" />
              </NavLink>
              <NavLink to="https://www.linkedin.com/company/krashak-innovative-solutions/">
                <FaLinkedin className="icon" color="#0077B5" />
              </NavLink>
              <NavLink to="https://www.instagram.com/krashak_innovative_solutions?igsh=bXZ2c2ZrZHR1eHRu">
                <FaInstagram className="icon" />
              </NavLink>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer_copyright">
        <hr />
        <p>Copyright 2024@ Krashak Innovative Solution- All Right Reserved</p>
      </div>
    </div>
  );
}

export default Footer;
