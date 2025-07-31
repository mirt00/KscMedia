import React from "react";
import "./LogoSearch.css";
import { UilSearch } from "@iconscout/react-unicons";

const LogoSearch = () => {
  return (
    <div className="logo-search">
      <div className="search-icon-wrapper">
        <UilSearch size="36" color="#f95f35" />
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Search #tags or people..." />
        <button className="search-btn">
          <UilSearch size="20" />
        </button>
      </div>
    </div>
  );
};

export default LogoSearch;
