import React from "react";
import "./UserAccount.css";
import { NavLink } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineHelpCenter } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../Notifytoast/notification";
function UserAccount({ userSidebar, setUserSidebar, SetIsLogin, name, email }) {
  const navigate = useNavigate();

  const handleLogOut = async (e) => {
    e.preventDefault();

    const url = `${process.env.REACT_APP_BACKEND_URL}/auth/logout`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(),
      });
      const result = await response.json();
      console.log(result);

      const { success, message } = result;
      if (success) {
        handleSuccess(message);
        setUserSidebar(false);
        localStorage.removeItem("user");
        setTimeout(() => {
          navigate("/login");
          SetIsLogin(false);
        }, 2000);
      }
    } catch (error) {
      handleError(error);
      console.log("error", error);
    }
  };

  return userSidebar ? (
    <div className="user_account">
      <div className="user_details">
        <div className="user_info">
          <h3>{name}</h3>
          <h4>{email}</h4>
        </div>
      </div>

      <hr className="custom_divider" />
      <div className="navigation">
        <ul className="user_nav">
          <NavLink
            onClick={() => setUserSidebar(false)}
            to="/testing"
            className="nav_li"
          >
            <p>
              <RxDashboard />
            </p>
            <span>Dashbod</span>
          </NavLink>

          <NavLink
            onClick={() => setUserSidebar(false)}
            to="/chat"
            className="nav_li"
          >
            <p>
              <IoNewspaperOutline />
            </p>
            <span>Blog / News</span>
          </NavLink>
          <NavLink
            onClick={() => setUserSidebar(false)}
            to="/help"
            className="nav_li"
          >
            <p>
              <MdOutlineHelpCenter />
            </p>
            <span>Support / Help</span>
          </NavLink>

          <NavLink
            onClick={() => setUserSidebar(false)}
            to="/"
            className="nav_li"
          >
            <p>
              <IoMdSettings />
            </p>
            <span>Settings</span>
          </NavLink>
          <NavLink onClick={handleLogOut} className="nav_li">
            <p>
              <IoIosLogOut />
            </p>
            <span>Log out</span>
          </NavLink>
        </ul>
      </div>

      <button onClick={() => setUserSidebar(false)}>
        <IoClose className="closed" />
      </button>
    </div>
  ) : null;
}

export default UserAccount;
