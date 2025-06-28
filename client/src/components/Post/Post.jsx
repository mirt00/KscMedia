import React, { useState, useEffect } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { likePost } from "../../api/PostsRequests";
import PostHeader from "../PostHeader/PostHeader";
import { useSelector } from "react-redux";
import { getUser } from "../../api/UserRequests";
import { useNavigate } from "react-router-dom";

const Post = ({ data }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [postUser, setPostUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(data.userId);
        setPostUser(response.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, [data.userId]);

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

const handlePostClick = () => {
  navigate(`/post/${data._id}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

  return (
    <div
      className="PostCard"
      onClick={handlePostClick}
    >
      {postUser && (
        <PostHeader user={postUser} createdAt={data.createdAt} post={data} />
      )}
          <span class="caption">{data.desc}</span>
      {data.image && (
        <div className="PostImageContainer">
          <img
            className="PostImage"
            src={process.env.REACT_APP_PUBLIC_FOLDER + data.image}
            alt="Post"
          />
        </div>
      )}

      <div className="PostContent">
        <div
          className="PostActions"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={liked ? Heart : NotLike}
            alt="like"
            className="PostIcon"
            onClick={handleLike}
          />
          <img src={Comment} alt="comment" className="PostIcon" />
          <img src={Share} alt="share" className="PostIcon" />
        </div>

        <span className="PostLikes">{likes} likes</span>

        <div className="PostDesc">
          <span className="PostAuthor"><b>{data.name} </b></span>

        </div>
      </div>
    </div>
  );
};

export default Post;
