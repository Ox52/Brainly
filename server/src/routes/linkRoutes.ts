import express from "express";
import { authmiddleware } from "../middleware.js";
import { shareBrainController, sharedLinkController } from "../controllers/LinkController.js";

const linkRouter = express.Router();

linkRouter.get("/brainly/share", (req, res) => {
  res.send("Route exits");
});

linkRouter.post("/brainly/share", authmiddleware, shareBrainController);

linkRouter.get("/brainly/:shareLink", sharedLinkController);

export default linkRouter;
