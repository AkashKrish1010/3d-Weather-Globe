import AuthController, { login, register } from "../controllers/AuthController.js";
import express from "express";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);


export default router;