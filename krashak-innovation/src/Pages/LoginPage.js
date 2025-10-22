import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../Notifytoast/notification";

function LoginPage({ SetIsLogin, name, setName, email, setEmail }) {
  const navigate = useNavigate();
  const [action, setAction] = useState("Sign Up");

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // data fetch from server
    const payload = {
      email,
      password,
      ...(action === "Sign Up" && { name }), // Only add name in signup
    };

    const url =
      action === "Sign Up"
        ? `${process.env.REACT_APP_BACKEND_URL}/auth/signup`
        : `${process.env.REACT_APP_BACKEND_URL}/auth/login`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      console.log(result);

      const { success, message, error } = result;
      if (success) {
        SetIsLogin(true);
        setName(result?.user?.name);
        setEmail(result?.user?.email);
        localStorage.setItem("user", JSON.stringify(result.user));
        handleSuccess(message);
        setTimeout(() => navigate("/"), 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!error) {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
      console.log("error", error);
    }
  };

  return (
    <div className="login">
      <div className="login_container">
        <form onSubmit={handleSubmit}>
          <h1>{action}</h1>
          <div className="input">
            {action === "Login" ? (
              <div></div>
            ) : (
              <div className="input-box">
                <label htmlFor="name">
                  <FaUser />
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Name"
                  required
                />
              </div>
            )}

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

            <div className="input-box">
              <label htmlFor="password">
                <RiLockPasswordFill />
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <div onClick={() => navigate("/reset")} className="forget-password">
              <p>Forget Password ?</p>
            </div>

            <div className="submit-button">
              <button className="btn" type="submit">
                {action === "Sign Up" ? "Sign Up" : "Sign In"}
              </button>
            </div>

            {action === "Sign Up" ? (
              <div className="account">
                Already have an account ?{" "}
                <span
                  onClick={(e) => {
                    setAction("Login");
                  }}
                >
                  Login
                </span>
              </div>
            ) : (
              <div className="account">
                Don't have an account ?{" "}
                <span
                  onClick={(e) => {
                    setAction("Sign Up");
                  }}
                >
                  Signup
                </span>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
