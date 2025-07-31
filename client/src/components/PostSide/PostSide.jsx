import React from "react";
import Posts from "../Posts/Posts";
import PostShare from "../PostShare/PostShare";

const PostSide = ({ searchValue }) => {
  return (
    <div className="PostSide">
      <PostShare />
      <Posts searchValue={searchValue} /> {/* Pass searchValue */}
    </div>
  );
};

export default PostSide;
