import React from "react";
import { Link } from "react-router-dom";
import { UilSetting, UilSearch } from "@iconscout/react-unicons";
import HomeIcon from "../../img/home.png";
import NotiIcon from "../../img/noti.png";
import CommentIcon from "../../img/comment.png";
import Logo from "../../img/logo.png";
import "./NavIcons.css";

const NavIcons = ({ searchValue, setSearchValue }) => {
  return (
    <header className="navbar">
      {/* Left - Logo */}
      <div className="navbar-left">
        <Link to="/home" className="navbar-logo">
          <img src={Logo} alt="KCS Media Logo" />
        </Link>
      </div>

      {/* Center - Search */}
      <div className="navbar-center">
        <div className="logo-search">
          <div className="search-icon-wrapper">
            <UilSearch size="24" color="#f95f35" />
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search #tags or people..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Right - Icons */}
      <nav className="navbar-right">
        <Link to="/home" className="nav-btn" aria-label="Home">
          <img src={HomeIcon} alt="Home" />
        </Link>
        <button className="nav-btn" aria-label="Settings">
          <UilSetting size="24" />
        </button>
        <button className="nav-btn" aria-label="Notifications">
          <img src={NotiIcon} alt="Notifications" />
        </button>
        <Link to="/chat" className="nav-btn" aria-label="Messages">
          <img src={CommentIcon} alt="Messages" />
        </Link>
      </nav>
    </header>
  );
};

export default NavIcons;
