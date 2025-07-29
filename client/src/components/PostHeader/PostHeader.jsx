// PostHeader.jsx

import React, { useState, useRef, useEffect } from "react";
import "./PostHeader.css";
import { Link } from "react-router-dom";
import moment from "moment";
import { BsThreeDots } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "../../actions/UploadAction";

const PostHeader = ({ user, createdAt, post, onEdit }) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user: currentUser } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (!post || !post._id) {
      console.error("Post or post._id is undefined");
      return;
    }
    dispatch(deletePost(post._id));
    setDropdownOpen(false);
  };

  const handleEdit = () => {
    if (onEdit) onEdit(); // 🔁 Call parent's edit handler
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="postHeader">
      <Link to={`/profile/${user._id}`} className="postUser">
        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt="Profile"
          className="postUserImg"
        />
        <div className="postUserInfo">
          <span className="postUsername">
            {user.firstname} {user.lastname}
          </span>
          <span className="postTime">{moment(createdAt).fromNow()}</span>
        </div>
      </Link>

      {currentUser._id === user._id && (
        <div className="dotsMenu" ref={dropdownRef}>
          <BsThreeDots
            className="dotsIcon"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && (
            <div className="dropdown">
              <span onClick={handleEdit} className="dropdownItem">
                <FiEdit /> Edit
              </span>
              <span onClick={handleDelete} className="dropdownItem">
                <AiOutlineDelete /> Delete
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostHeader;
