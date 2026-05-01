import dotenv from "dotenv";
dotenv.config();
import express from "express";

import cors from "cors";
import { connectDB } from "./db.js";
import useRouter from "./routes/authRoutes.js";
import contentRouter from "./routes/contentRoutes.js";
import linkRouter from "./routes/linkRoutes.js";

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://brainly-frontend-livid.vercel.app",
  process.env.FRONTEND_URL,
].filter((origin): origin is string => Boolean(origin));

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({ status: "ok", service: "brainly-backend" });
});

app.use(async (_req, _res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

app.use("/api/v1", useRouter);
app.use("/api/v1", contentRouter);
app.use("/api/v1", linkRouter);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Request failed:", err.message);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 3000;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
