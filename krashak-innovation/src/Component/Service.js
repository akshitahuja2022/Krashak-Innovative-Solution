import React from "react";
import "./Service.css";
import { assets } from "../assests/assests";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
function Service({ islogin }) {
  return (
    <div className="service_container">
      <div className="service_main_heading">
        <h4>Our Services </h4>
      </div>

      <div className="service-section">
        <div className="service_heading">
          <h4>
            We Provide Innovative And Technology-Driven Agricultural Services
          </h4>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="main_service "
        >
          <div className="service1 service">
            <div className="service_img">
              <img src={assets.service1} alt="" width="80px" />
            </div>

            <div className="service_content">
              <h3>Soil Testing</h3>
              <p>
                Soil testing is the process of analyzing soil samples to
                determine their nutrient content, pH levels, moisture, organic
                matter, and presence of contaminants.{" "}
                <span>
                  {" "}
                  It helps farmers, gardeners, and agricultural experts make
                  informed decisions about fertilization, irrigation, and crop
                  selection for better yield and soil health.
                </span>
              </p>
            </div>
            <div className="service_button">
              <Link to={`${islogin ? "/register" : "/login"}`} className="btn">
                Book Now →
              </Link>
            </div>
          </div>

          <div className="service service2 ">
            <div className="service_img">
              <img src={assets.service2} alt="" width="80px" />
            </div>

            <div className="service_content">
              <h3>Fertilizer Testing</h3>
              <p>
                Fertilizer spray is a liquid solution containing essential
                nutrients (Nitrogen, Phosphorus, Potassium, etc.) applied
                directly to plants through spraying.{" "}
                <span>
                  {" "}
                  It helps crops absorb nutrients quickly and efficiently,
                  promoting healthy growth and higher yields. They provide
                  Provides fast nutrient absorption and fruit production.
                </span>
              </p>
            </div>
            <div className="service_button">
              <Link to={`${islogin ? "/register" : "/login"}`} className="btn">
                Book Now →
              </Link>
            </div>
          </div>

          <div className="service3 service ">
            <div className="service_img">
              <img src={assets.service3} alt="" width="80px" />
            </div>
            <div className="service_content">
              <h3>Crop Disease Detection</h3>
              <p>
                Crop Disease Detection is the process of identifying plant
                diseases early using visual inspection, AI-based technology, and
                chemical testing.{" "}
                <span>
                  {" "}
                  It helps farmers prevent crop loss, improve yield quality,
                  apply the right treatments before the disease spreads, and
                  Boosts sustainable farming through precision treatment.
                </span>
              </p>
            </div>
            <div className="service_button">
              <Link to={`${islogin ? "/register" : "/login"}`} className="btn">
                Book Now →
              </Link>
            </div>
          </div>

          <div className="service4 service">
            <div className="service_img">
              <img src={assets.service4} alt="" width="80px" />
            </div>
            <div className="service_content">
              <h3>AI-Based Guiding System</h3>
              <p>
                An AI-Based Guiding System in agriculture uses Artificial
                Intelligence (AI), Machine Learning (ML), IoT sensors, and data
                analytics to help farmers make smart.
                <span>
                  {" "}
                  These systems analyze real-time data from soil, weather, and
                  crops to improve efficiency, yield, and sustainability in
                  farming.
                </span>
              </p>
            </div>
            <div className="service_button">
              <Link to={`${islogin ? "/register" : "/login"}`} className="btn">
                Book Now →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Service;
