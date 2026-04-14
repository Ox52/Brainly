
import express from "express";
import { authmiddleware } from "../middleware.js";
import { addContentController, deletedContentController, getContentController } from "../controllers/contentController.js";

const contentRouter = express.Router();

contentRouter.post("/content", authmiddleware, addContentController)
contentRouter.get("/content", authmiddleware , getContentController)
contentRouter.delete("/content/:id", authmiddleware, deletedContentController)

export default contentRouter;
