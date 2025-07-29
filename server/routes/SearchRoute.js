import express from "express";
import  searchUsers  from "../controllers/SearchController.js"; // adjust path

const router = express.Router();

router.get("/:keyword", searchUsers) 


export default router;
