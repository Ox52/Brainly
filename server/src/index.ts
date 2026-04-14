import dotenv from "dotenv";
dotenv.config();
import express from "express";

import cors from "cors";
import { connectDB } from "./db.js";
import useRouter from "./routes/authRoutes.js";
import contentRouter from "./routes/contentRoutes.js";
import linkRouter from "./routes/linkRoutes.js";


const app = express();

app.use(
  cors({
    origin: [],

    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

app.use(express.json());

connectDB();

app.use("/api/v1", useRouter);
app.use("/api/v1", contentRouter);
app.use("/api/v1", linkRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
