

import React, { useState, useEffect } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { likePost } from "../../api/PostsRequests";
import PostHeader from "../PostHeader/PostHeader";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../api/UserRequests";
import { useNavigate } from "react-router-dom";
import { updatePost } from "../../actions/UploadAction";
import { toast } from "react-toastify";
import { FiSave } from "react-icons/fi";
const Post = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);

  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [postUser, setPostUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCaption, setEditedCaption] = useState(data.desc);

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

  // 🟡 Called from PostHeader (via prop)
  const handleEditCaption = () => {
    setIsEditing(true);
  };

  const handleSaveCaption = async () => {
    try {
      await dispatch(updatePost(data._id, { desc: editedCaption }));
      data.desc = editedCaption; // Update locally
      toast.success("Post updated");
    } catch (err) {
      toast.error("Failed to update");
    }
    setIsEditing(false);
  };

  return (
    <div className="PostCard" onClick={handlePostClick}>
      {postUser && (
        <PostHeader
          user={postUser}
          createdAt={data.createdAt}
          post={data}
          onEdit={handleEditCaption} // 🔁 Pass edit handler to PostHeader
        />
      )}

      {isEditing ? (
  <div className="editCaption">
    <textarea
      value={editedCaption}
      onChange={(e) => setEditedCaption(e.target.value)}
      column="6"
      className="captionInput"
    />
    <button onClick={handleSaveCaption} className="saveBtn">
      <FiSave />
    </button>
  </div>
) : (
  <span className="caption">{data.desc}</span>
)}

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
        <div className="PostActions" onClick={(e) => e.stopPropagation()}>
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
          <span className="PostAuthor">
            <b>{data.name} </b>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Post;

