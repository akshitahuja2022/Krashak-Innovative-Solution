import React from "react";
import { assets } from "../assests/assests";
import "./MissionVision.css";
import { motion } from "framer-motion";

function MissionVision() {
  return (
    <motion.div
      className="container"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, delay: 0.4 }}
    >
      <div className="vision">
        <img src={assets.vision} alt="" />
        <h5>Our Vision</h5>
        <p>
          To make agriculture a sustainable business by helping farmers infuse
          the right set of technology and automation, creating a more efficient,
          productive and smarter farms of the future.
        </p>
      </div>
      <div className="mission">
        <img src={assets.mission} alt="" />
        <h5>Our Mission</h5>
        <p>
          Our mission is to develop practical, innovative solutions to the real
          problems farmers face during the farming process. By providing
          affordable and fast soil health testing.
        </p>
      </div>
    </motion.div>
  );
}

export default MissionVision;
