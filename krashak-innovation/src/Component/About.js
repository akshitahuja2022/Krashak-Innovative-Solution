import React from "react";
import { assets } from "../assests/assests";
import "./About.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
function About({ islogin }) {
  return (
    <div className="about_container">
      <div className="about_heading">
        <h4>About Us</h4>
      </div>

      <div className="about_content">
        <div className="about_desc">
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
          >
            Krashak Innovative Solution: Smart Farming for a Better Future!
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
          >
            Healthy soil is the backbone of successful agriculture. It impacts
            everything from crop yields to water retention and disease
            resistance making it crucial for sustainable farming practices. By
            understanding your soil’s condition, you can make smarter decisions
            that improve productivity and protect your land for future
            generations.
          </motion.p>

          <div className="about_button">
            <Link to="/about" className="btn" type="button">
              Learn More →
            </Link>
          </div>
        </div>
        <div className="about_images">
          <img className="img" src={assets.about1} alt="" />
          <img className="img" src={assets.about2} alt="" />
          <img src={assets.about3} alt="" />
          <img className="img" src={assets.about4} alt="" />
        </div>
      </div>
    </div>
  );
}

export default About;
