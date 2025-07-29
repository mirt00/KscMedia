import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Post from "../components/Post/Post";
import NavIcons from "../components/NavIcons/NavIcons";

const PostDetails = () => {
  const { postId } = useParams();
  const [mainPost, setMainPost] = useState(null);
  const [similarPosts, setSimilarPosts] = useState([]);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postRes = await axios.get(`http://localhost:5000/posts/${postId}`);
        setMainPost(postRes.data);

        const similarRes = await axios.get(`http://localhost:5000/posts/similar/${postId}`);
        setSimilarPosts(similarRes.data);
      } catch (err) {
        console.error("Failed to load post details", err);
      }
    };

    fetchPostData();
  }, [postId]);

  if (!mainPost) return <p>Loading...</p>;

  return (
    <div>
<NavIcons></NavIcons>
    <div className="post-details-page" style={{ padding: "1rem" }}>
      {/* <h2>Main Post</h2> */}
      <Post data={mainPost} />

      <h3 style={{ marginTop: "2rem" }}>Similar Posts</h3>
 <div>
  {/* Internal responsive grid styles */}
  <style>
    {`
      .grid-similar-posts {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        margin-top: 1rem;
      }

      @media (max-width: 1024px) {
        .grid-similar-posts {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 600px) {
        .grid-similar-posts {
          grid-template-columns: 1fr;
        }
      }
    `}
  </style>

  {/* Your grid rendering */}
  <div className="grid-similar-posts">
    {similarPosts.map((post) => (
      <Post key={post._id} data={post} />
    ))}
  </div>
</div>

    </div>
    </div>
  );
};

export default PostDetails;
