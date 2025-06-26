import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const uploadImage = (data) => API.post("/upload/", data);
export const uploadPost = (data) => API.post("/posts", data);
// / 🔹 NEW: Update a specific post
export const updatePost = (id, data) => API.put(`/posts/${id}`, data);

// 🔹 NEW: Delete a specific post
export const deletePost = (id) => API.delete(`/posts/${id}`);