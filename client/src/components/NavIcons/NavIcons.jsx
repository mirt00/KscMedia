import React from "react";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import Logo from "../../img/logo.png";
import { UilSetting } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import "./NavIcons.css";

const NavIcons = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/home">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>

      <div className="nav-icons-wrapper">
        <Link to="/home">
          <img src={Home} alt="Home" />
        </Link>
        <UilSetting size="24" />
        <img src={Noti} alt="Notifications" />
        <Link to="/chat">
          <img src={Comment} alt="Messages" />
        </Link>
      </div>
    </nav>
  );
};

export default NavIcons;
