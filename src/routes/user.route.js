import express from "express";
import { addUser, deleteUser, getUsers, updateUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/get-user", getUsers);
router.post("/add-user",addUser);
router.put("/update-user/:id", updateUser);
router.delete("/delete-user/:id",deleteUser);

export default router;
