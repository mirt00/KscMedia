const postReducer = (
  state = { posts: null, loading: false, error: false, uploading: false },
  action
) => {
  switch (action.type) {
    // Post Uploading
    case "UPLOAD_START":
      return { ...state, error: false, uploading: true };

    case "UPLOAD_SUCCESS":
      return {
        ...state,
        posts: [action.data, ...(state.posts || [])],
        uploading: false,
        error: false,
      };

    case "UPLOAD_FAIL":
      return { ...state, uploading: false, error: true };

    // Retrieving Posts
    case "RETREIVING_START":
      return { ...state, loading: true, error: false };

    case "RETREIVING_SUCCESS":
      return { ...state, posts: action.data, loading: false, error: false };

    case "RETREIVING_FAIL":
      return { ...state, loading: false, error: true };

    // 🔁 Updating a Post
    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    // 🗑️ Deleting a Post
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };

    default:
      return state;
  }
};

export default postReducer;
