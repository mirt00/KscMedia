import React, { useState } from "react";
import PostSide from "../components/PostSide/PostSide";
import ProfileSide from "../components/profileSide/ProfileSide";
import RightSide from "../components/RightSide/RightSide";
import NavIcons from "../components/NavIcons/NavIcons";
import "./Home.css";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");  // search state here

  return (
    <>
      <NavIcons
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <div className="Home">
        <ProfileSide />
        <PostSide searchValue={searchValue} />
        <RightSide />
      </div>
    </>
  );
};

export default Home;
