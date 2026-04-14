import express from "express";
import {
  loginController,
  signupController,
} from "../controllers/authController.js";
const useRouter = express.Router();

useRouter.post("/signup", signupController);
useRouter.post("/login", loginController);

export default useRouter;

