import express from "express";
import { addPost, deletePost, getAllPost, updatePost } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/get-all-post", getAllPost);
router.post("/add-post",addPost);
router.delete("/delete-post/:id", deletePost);
router.put("/update-post/:id",updatePost);

export default router;
