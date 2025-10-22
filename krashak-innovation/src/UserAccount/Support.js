import React, { useState } from "react";
import "./Support.css";
import support from "../assests/Support.png";
import { FaAngleDown } from "react-icons/fa6";
import Footer from "../Component/Footer";
function Support() {
  const [openIndex, setOpenIndex] = useState(null);
  // const [isAnswer, setIsAnswer] = useState(false);

  const toggle = (idx) => {
    setOpenIndex(idx === openIndex ? null : idx);
    // setIsAnswer(true);
  };

  const faqs = [
    {
      q: "Where can I get my soil health result ?",
      a: "You can get your soil health result on your mobile app & this website under the section of testing.",
    },
    {
      q: "How can I get my soil health tested ?",
      a: "You need to register your farm under the booking section of this website and fill the form with correct details.",
    },
    {
      q: "How to collect soil samples for testing ?",
      a: "For collecting soil samples properly, dig a 10cm hole and them collect roughly 100g of soil from 4 different regions of your farm. Then mix all these samples and remove half of the sample. Repeat this process until you are left with the appropriate amount(50-100g) you need for sample.",
    },
    {
      q: "What is the importance of soil health in agriculture ?",
      a: "Soil Health is play an Important role in Agriculture. Soil health shows the availability of the nutrients and other important compounds needed by crops. Soil health determines the health of the crops and the yield of the field. Improving soil health may provide a drastic improvement in the crop production and well as the quality of yield from the field.",
    },
    {
      q: "What fertiliser to use and what will be the appropriate quantity ?",
      a: "Once you get your soil tested and get the results our AI based Farmer guiding system will provide you with recommendation of fertilizer according to the need of the crops. It will also give you appropriate advice on the quantity of fertilizer.",
    },
    {
      q: "Why should I test my soil health ?",
      a: "Testing soil health is a very important aspect in precision agriculture. It is very possible that our soil needs some other grade of fertilizer but due to usage of wrong fertilizer we may damage our soil and degrade its quality. For the selection of correct fertilizer and proper selection of crops we need to know the soil health.",
    },
    {
      q: "What are the important soil health parameters ?",
      a: "There are 12 Soil health parameters - Nitrogen, Phosphorus Potassium, Zinc, Iron, Manganese, pH, Cation Exchange Capacity, Organic Carbon, Water retention capacity, Soil pollutant(like Pd, Cd , As)",
    },
  ];

  return (
    <div className="support-container">
      <div className="support-img">
        <img src={support} alt="" />
      </div>

      <div className="support-middle">
        <div className="heading">
          <h3>
            Need Help?{" "}
            <span className="support-sub">You are in the right place</span>
          </h3>
          <p>
            Find quick answers in our FAQs or get in touch with our support team
            anytime. Your experience matters, and we're here to make it as
            smooth and stress-free as possible.
          </p>
        </div>
        <div className="faq">
          <div className="questions">
            {faqs.map(({ q, a }, idx) => (
              <p key={idx}>
                <span
                  className={`ques ${openIndex === idx ? "active" : ""}`}
                  onClick={() => toggle(idx)}
                >
                  {q}
                  <FaAngleDown className="icon" />
                </span>

                <span className={`ans ${openIndex === idx ? "active" : ""}`}>
                  {a}
                </span>
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="support-footer">
        <Footer />
      </div>
    </div>
  );
}

export default Support;
