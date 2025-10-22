import React, { useState } from "react";
import "./RoverController.css";
import MapPage from "./MapPage";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { MdNotStarted } from "react-icons/md";
import { TbAutomaticGearbox } from "react-icons/tb";
import { IoChevronForwardCircle } from "react-icons/io5";
import { IoCaretBackCircle } from "react-icons/io5";
import { assets } from "../assests/assests";
import Footer from "../Component/Footer";
import { IoStopCircle } from "react-icons/io5";

import { getDatabase, ref, set } from "firebase/database";
import { app } from "../Firebase/Firebase";

const db = getDatabase(app);
function RoverController() {
  const sendCommand = (command) => {
    const commandRef = ref(db, "Status");
    set(commandRef, command);
  };

  const [isMap, setIsMap] = useState(false);
  const [formData, setFormData] = useState({
    address: "",
  });

  return (
    <div className="rover-container">
      <div className="rover-header">
        <img src={assets.rover} alt="" />
      </div>
      <div className="rover-middle">
        <div className="heading">
          <h3>Empowering Farmers with Smart Rover Technology</h3>
          <p>
            Our Rover Controller is designed to revolutionize precision farming
            by offering seamless control over autonomous agricultural rovers.
          </p>
        </div>

        <div className="rover-button">
          <button
            onClick={() => sendCommand("Automatic")}
            type="submit"
            className="btn"
          >
            {" "}
            Automatic
            <span>
              <TbAutomaticGearbox className="icon" />
            </span>
          </button>

          <button
            onClick={() => sendCommand("Start")}
            type="submit"
            className="btn"
          >
            {" "}
            Start Spray
            <span>
              <MdNotStarted className="icon" />
            </span>
          </button>

          <button
            onClick={() => sendCommand("Forward")}
            type="submit"
            className="btn"
          >
            Forward
            <span>
              {" "}
              <IoChevronForwardCircle className="icon" />
            </span>
          </button>
          <button
            onClick={() => sendCommand("Backward")}
            type="submit"
            className="btn"
          >
            <span>
              <IoCaretBackCircle className="icon" />
            </span>
            Backward
          </button>

          <button
            onClick={() => sendCommand("Stop")}
            type="submit"
            className="btn"
          >
            {" "}
            Stop Spray
            <span>
              {" "}
              <IoStopCircle className="icon" />
            </span>{" "}
          </button>

          <button
            onClick={() => sendCommand("Left")}
            type="submit"
            className="btn"
          >
            {" "}
            <span>
              {" "}
              <FaLongArrowAltLeft className="icon" />
            </span>{" "}
            Left
          </button>
          <button
            onClick={() => sendCommand("Right")}
            type="submit"
            className="btn"
          >
            Right{" "}
            <span>
              <FaLongArrowAltRight className="icon" />
            </span>
          </button>
        </div>
        <div className="rover-button wavepoint-button">
          <button onClick={() => setIsMap(true)} type="submit">
            Wavepoint{" "}
          </button>

          <label htmlFor="location">Location: </label>
          <input
            type="text"
            placeholder="WavePoint Location"
            value={formData.address}
            onChange={(e) => setFormData(e.target.value)}
            onClick={() => setIsMap(true)}
          />
        </div>
        {isMap ? (
          <div className="map-section">
            <MapPage
              isMap={isMap}
              setIsMap={setIsMap}
              setFormData={setFormData}
            />
          </div>
        ) : null}
      </div>

      <div className={`rover-footer ${isMap ? "footer" : ""}`}>
        <Footer />
      </div>
    </div>
  );
}

export default RoverController;
