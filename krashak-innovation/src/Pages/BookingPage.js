import React, { useState } from "react";
import "./BookingPage.css";
import support from "../assests/Support.png";
import Footer from "../Component/Footer";
import { handleError, handleSuccess } from "../Notifytoast/notification";
import { motion } from "framer-motion";
import MapPage from "./MapPage";

function BookingPage() {
  const [amount] = useState(100);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    gender: "",
    fathername: "",
    address: "",
    city: "",
    state: "",
    mobile: "",
  });
  const [isMap, setIsMap] = useState(false);

  // For handlePayment
  const handlePayment = async () => {
    // check if any field is empty
    const isEmpty = Object.values(formData).some((val) => val.trim() === "");
    if (isEmpty) {
      return handleError("All fields are required");
    }

    // Save the Data in mongoDb database
    const registerData = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const registerFormData = await registerData.json();

    if (!registerData.ok) {
      handleError(registerFormData.message || "Register From Save Failed");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/payment/order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        }
      );
      const data = await response.json();
      console.log(data);
      handlePaymentVerify(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // payment verify function
  const handlePaymentVerify = async (data) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: data.amount,
      email: formData.email,
      currency: data.currency,
      name: "KrashakPayment",
      description: "Test Mode",
      order_id: data.id,
      handler: async (response) => {
        console.log("response", response);
        try {
          const res = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/payment/verify`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                email: formData.email,
              }),
            }
          );
          const verifyData = await res.json();
          if (verifyData) {
            console.log(verifyData);
            console.log(verifyData.message);
            handleSuccess("Payment Successfully");
          }
        } catch (error) {
          handleError(error.message);
        }
      },
      theme: {
        color: "#f7ba49",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="booking-container">
      <div className="booking-img">
        <img src={support} alt="" />
      </div>

      <div className="booking">
        <motion.div
          className="content"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
        >
          <h3>Book Your Soil Test Today for Smarter Farming</h3>
          <p>
            Our advanced soil testing device gives you instant insights into pH,
            moisture, and nutrients. With accurate data, you can choose the
            right crops, fertilizers, and irrigation methods. This helps improve
            yield, reduce costs, and protect the environment. Book your test now
            and take control of your farm’s future!
          </p>
        </motion.div>

        <motion.div
          className="booking-form"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
        >
          <div className="form-heading">
            <h4>Registration Form</h4>
          </div>
          <form className="form">
            <p>Basic Information</p>
            <div className="fields">
              <div className="input-field">
                <label htmlFor="fname">First Name</label>
                <input
                  type="text"
                  id="fname"
                  className="input"
                  value={formData.fname}
                  onChange={(e) =>
                    setFormData({ ...formData, fname: e.target.value })
                  }
                  required
                />
              </div>

              <div className="input-field">
                <label htmlFor="lname">Last Name</label>
                <input
                  type="text"
                  id="lname"
                  value={formData.lname}
                  className="input"
                  onChange={(e) =>
                    setFormData({ ...formData, lname: e.target.value })
                  }
                  required
                />
              </div>

              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  value={formData.email}
                  className="in"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="input-field">
                <label htmlFor="gender">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  required
                >
                  <option value="">--Select--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="input-field">
                <label htmlFor="fathername">Father Name</label>
                <input
                  type="text"
                  value={formData.fathername}
                  onChange={(e) =>
                    setFormData({ ...formData, fathername: e.target.value })
                  }
                  className="input"
                />
              </div>

              <div className="input-field">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  onClick={() => setIsMap(true)}
                  className="in"
                  required
                />
              </div>

              <div className="input-field">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="input"
                  required
                />
              </div>

              <div className="input-field">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                  className="input"
                  required
                />
              </div>

              <div className="input-field">
                <label htmlFor="country">Mobile No.</label>
                <input
                  type="text"
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                  className="in"
                  required
                />
              </div>
            </div>
          </form>

          <div className="booking-button">
            <button onClick={handlePayment} className="btn" type="button">
              Add Payment →
            </button>
          </div>
        </motion.div>
      </div>

      {isMap ? (
        <MapPage isMap={isMap} setIsMap={setIsMap} setFormData={setFormData} />
      ) : null}

      <div className="booking-footer">
        <Footer />
      </div>
    </div>
  );
}

export default BookingPage;
