import React, { useEffect } from "react";
import { getTimelinePosts } from "../../actions/PostsAction";
import Post from "../Post/Post";
import { useSelector, useDispatch } from "react-redux";
import "./Posts.css";
import { useParams } from "react-router-dom";

const Posts = ({ searchValue }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, [dispatch, user._id]);

  if (!posts) return "No Posts";

  if (params.id) {
    posts = posts.filter((post) => post.userId === params.id);
  }

  if (searchValue.trim() !== "") {
    const searchLower = searchValue.toLowerCase();
    posts = posts.filter((post) =>
      post.desc?.toLowerCase().includes(searchLower)
    );
  }

  return (
    <div className="Posts">
      {loading
        ? "Fetching posts...."
        : posts.map((post, index) => <Post data={post} key={index} />)}
    </div>
  );
};

export default Posts;
