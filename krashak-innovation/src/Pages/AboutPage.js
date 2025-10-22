import React from "react";
import aboutPage from "../assests/aboutPage.png";
import "./AboutPage.css";
import { assets } from "../assests/assests";
import { motion } from "framer-motion";
import MissionVision from "../Component/MissionVision";
import Footer from "../Component/Footer";
function AboutPage() {
  return (
    <div className="aboutPage">
      <div
        className="aboutPage_img"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(${aboutPage})`,
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <motion.div
        className="aboutPage_content"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
      >
        <div className="aboutContent_image">
          <img src={assets.about1} alt="" />
        </div>
        <div className="aboutPage_desc">
          <p>
            The Role of Soil Health in Agriculture Healthy soil is the backbone
            of successful agriculture. It impacts everything from crop yields to
            water retention and disease resistance, making it crucial for
            sustainable farming practices. However, many farmers struggle to
            access timely and affordable soil health insights, which can lead to
            inefficient use of fertilizers, water, and other inputs. By
            understanding your soil’s condition, you can make smarter decisions
            that improve productivity and protect your land for future
            generations.
          </p>

          <p className="para">
            Our Portable Soil Health Testing Device Fast Results: In
            agriculture, time is everything. Get real-time soil health data in
            minutes, allowing for immediate action. Cost-Effective: Soil health
            shouldn’t be a luxury. Our device makes frequent soil testing
            affordable, helping farmers monitor soil conditions throughout the
            growing season.
          </p>
        </div>
      </motion.div>

      <div className="about_vision">
        <MissionVision />
      </div>

      <div className="aboutPage_footer">
        <Footer />
      </div>
    </div>
  );
}

export default AboutPage;
