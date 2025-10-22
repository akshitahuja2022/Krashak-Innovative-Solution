import React from "react";
import { assets } from "../assests/assests";
import { motion } from "framer-motion";
import "./Feature.css";
function Feature() {
  return (
    <motion.div
      initial={{ translateX: "100%" }}
      whileInView={{ translateX: 0 }}
      transition={{ duration: 1.5 }}
      className="feature_container"
    >
      <div className="feature">
        <div className="feature_img">
          <img src={assets.feature1} alt="" width="80px" />
        </div>
        <div className=" feature_content">
          <h3>HEALTH</h3>
          <p>Enhance your farm's vitality with smart solutions!</p>
        </div>
      </div>
      <div className="feature">
        <div className="feature_img">
          <img src={assets.feature2} width="80px" alt="" />
        </div>
        <div className=" feature_content">
          <h3>PROTECT</h3>
          <p>Shield your crops, prevent damage, ensure growth!</p>
        </div>
      </div>

      <div className="feature">
        <div className="feature_img">
          <img src={assets.feature3} alt="" width="80px" />
        </div>
        <div className=" feature_content">
          <h3>GROW</h3>
          <p>Grow faster, harvest more, and boost farm profits!</p>
        </div>
      </div>
    </motion.div>
  );
}

export default Feature;
