import React, { useRef } from "react";
import "./Contact.css";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { assets } from "../assests/assests";
import { handleError, handleSuccess } from "../Notifytoast/notification";

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_5n0femt", "template_5fchsgi", form.current, {
        publicKey: "bTDgDQ1jm3hf7-B7Q",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          handleSuccess("Message Sent Successfully");
        },
        (error) => {
          console.log("FAILED...", error.text);
          handleError("Failed to send email");
        }
      );
  };

  return (
    <div className="contact_section">
      <motion.div
        className="contact_form"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
      >
        <div className="heading">
          <h3>HAVE QUESTIONS?</h3>
          <h2>Send us a Message</h2>
        </div>

        <div className="form">
          <form ref={form} onSubmit={sendEmail}>
            <input type="text" name="name" placeholder="Name" />
            <input type="text" name="email" placeholder="Email" />
            <input type="text" name="phone" placeholder="Phone" />
            <textarea
              name="message"
              placeholder="Tell us About Yourself "
            ></textarea>

            <div className="contact_button">
              <motion.button className="btn" type="submit">
                Get In Touch
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>

      <div className="contact_details">
        <div className="heading">
          <h4>Contact Information</h4>
          <p>
            If you have any questions, just fill in the contact form, and we
            will answer you shortly.
          </p>
        </div>

        <div className="contact_link">
          <div className="contact">
            <img src={assets.email} alt="" width="42px" />
            <div className="detail">
              <h5>Offical Email</h5>
              <p>krashakinnovativesolutions@gmail.com</p>
            </div>
          </div>
          <div className="contact">
            <img src={assets.contact} alt="" width="45px" />
            <div className="detail">
              <h5>Phone Number</h5>
              <p>+91 63502 91328, +91 73078 13301</p>
            </div>
          </div>
          <div className="contact">
            <img src={assets.location} alt="" width="45px" />
            <div className="detail">
              <h5>Our Location</h5>
              <p>Engineering College Bikaner, Rajasthan (EIC Department)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
