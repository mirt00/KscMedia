import React from "react";
import PostSide from "../components/PostSide/PostSide";
import ProfileSide from "../components/profileSide/ProfileSide";
import RightSide from "../components/RightSide/RightSide";
import "./Home.css";
import NavIcons from "../components/NavIcons/NavIcons";
const Home = () => {
  return (
    <div>
      <NavIcons></NavIcons>
    <div className="Home">
      <ProfileSide/>
      <PostSide />

    </div>
    </div>
  );
};

export default Home;
