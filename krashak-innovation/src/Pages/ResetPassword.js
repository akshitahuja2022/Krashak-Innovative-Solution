import React, { useRef, useState } from "react";
import "./LoginPage.css";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { handleError, handleSuccess } from "../Notifytoast/notification";
import { useNavigate } from "react-router-dom";
function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const inputRefs = useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState(0);
  const [isOtpSubmit, setIsOtpSubmit] = useState(false);

  //send resetOtp in email
  const onSubmitResetOtp = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_BACKEND_URL}/auth/send-reset-otp`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      console.log(result);
      const { success, message } = result;
      if (success) {
        setIsEmailSent(true);
        handleSuccess(message);
      }
    } catch (error) {
      handleError(error);
      console.log("error", error);
    }
  };

  // on submit otp
  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    setOtp(otpArray.join(""));
    setIsOtpSubmit(true);
  };
  // new password submmit form
  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_BACKEND_URL}/auth/reset-password`;
    try {
      const respone = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const result = await respone.json();
      console.log(result);
      const { success, message } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate("/login"));
      }
    } catch (error) {
      handleError(error);
      console.log("error", error);
    }
  };
  return (
    <div className="login">
      <div className="login_container reset-container">
        {/* Email Sent form */}

        {!isEmailSent && (
          <form onSubmit={onSubmitResetOtp}>
            <h1>Reset password</h1>
            <p className="para">Enter your registered email address</p>

            <div className="input">
              <div className="input-box">
                <label htmlFor="email">
                  <MdEmail />
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email Id"
                  required
                />
              </div>

              <div className="submit-button">
                <button className="btn" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Otp input form */}
        {isEmailSent && !isOtpSubmit && (
          <form onSubmit={onSubmitOtp} className="reset-otp">
            <h1>Reset password OTP</h1>
            <p className="para">
              Enter the 6-digit code sent to your email id.
            </p>

            <div className="otp-box" onPaste={handlePaste}>
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <input
                    type="text"
                    maxLength="1"
                    key={index}
                    required
                    ref={(e) => (inputRefs.current[index] = e)}
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
            </div>
            <div className="submit-button">
              <button className="btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        )}

        {/* New Password */}
        {isOtpSubmit && isEmailSent && (
          <form onSubmit={onSubmitNewPassword} className="reset-otp">
            <h1>New password</h1>
            <p className="para">Enter the new password below</p>

            <div className="input">
              <div className="input-box">
                <label htmlFor="email">
                  <RiLockPasswordFill />
                </label>
                <input
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  type="password"
                  placeholder="Enter new password"
                  required
                />
              </div>

              <div className="submit-button">
                <button className="btn" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
