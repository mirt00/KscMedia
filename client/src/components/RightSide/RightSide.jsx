import React, { useState } from "react";
import "./RightSide.css";

// import TrendCard from "../TrendCard/TrendCard";
import ShareModal from "../ShareModal/ShareModal";
import NavIcons from "../NavIcons/NavIcons";
import FollowersCard from "../FollowersCard/FollowersCard";
const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <div className="RightSide">
 <FollowersCard/>
    </div>
  );
};

export default RightSide;

{/* <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} /> */}