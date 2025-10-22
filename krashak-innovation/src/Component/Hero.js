import React from "react";
import hero from "../assests/hero.png";

import "./Hero.css";
import { Link } from "react-router-dom";
function Hero({ islogin, setUserSidebar }) {
  return (
    <div className="hero">
      <div
        className="hero_img"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(${hero})`,
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="hero_content">
        <div className="hero_desc">
          <h1>Welcome to Krashak Innovative Solution</h1>
          <p>
            Our innovative portable soil testing device provides fast, reliable
            results on-site, allowing farmers to take control of their land’s
            health without the high costs and long delays of traditional
            methods.
          </p>
        </div>

        <div className="hero_button">
          <Link to="/about" className="btn" type="button">
            Learn More →
          </Link>
          <Link
            to={islogin ? "#" : "/login"}
            onClick={islogin ? () => setUserSidebar(true) : undefined}
            className="btn get_login"
            type="button"
          >
            {islogin ? "Profile →" : "Get Started →"}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
