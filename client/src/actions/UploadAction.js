import * as UploadApi from "../api/UploadRequest";

export const uploadImage = (data) => async (dispatch) => {
  try {
    console.log("Image upload Action start")
    await UploadApi.uploadImage(data);
  } catch (error) {
    console.log(error);
  }
};

export const uploadPost = (data) => async (dispatch) => {
  dispatch({ type: "UPLOAD_START" });
  try {
    const newPost =await UploadApi.uploadPost(data);
    dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_FAIL" });
  }
};


// 🔹 Update Post
export const updatePost = (id, postData) => async (dispatch) => {
  dispatch({ type: "UPLOAD_START" });
  try {
    const updated = await UploadApi.updatePost(id, postData);
    dispatch({ type: "UPLOAD_SUCCESS", data: updated.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_FAIL" });
  }
};

// 🔹 Delete Post
export const deletePost = (id) => async (dispatch) => {
  try {
    await UploadApi.deletePost(id);
    dispatch({ type: "DELETE_POST", payload: id });
  } catch (error) {
    console.log(error);
  }
};
