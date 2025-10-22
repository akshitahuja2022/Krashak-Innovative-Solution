import React from "react";
import "./TestingPage.css";
import { assets } from "../assests/assests";
import TestingDashboard from "../Component/TestingDashboard";
import Footer from "../Component/Footer";
function TestingPage() {
  return (
    <div className="test-container">
      <div className="test-header">
        <div className="heading">
          <h3> Revolutionizing Agriculture with Our Soil Testing Device</h3>

          <p>
            Krashak Innovative Solution introduces a cutting-edge soil testing
            device designed to empower farmers with precise, real-time soil
            health data. This smart tool helps identify nutrient deficiencies,
            pH levels, and moisture content with high accuracy. By making
            informed decisions, farmers can boost crop yield, reduce fertilizer
            waste, and protect the environment.{" "}
            <span>
              Our easy-to-use interface ensures anyone can operate the device
              without technical training.
            </span>
          </p>
        </div>
        <div className="test-header-img">
          <img src={assets.testing} alt="" />
        </div>
      </div>

      <div className="dashboard">
        <TestingDashboard />
      </div>

      <div className="test-footer">
        <Footer />
      </div>
    </div>
  );
}

export default TestingPage;
