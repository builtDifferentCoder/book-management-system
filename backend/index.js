import express from "express";
const app = express();
import logger from "./logger/logger.js";
import connectToDb from "./config/db.js";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import userRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import genresRoutes from "./routes/genreRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();
await connectToDb();

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//auth routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/genre", genresRoutes);
app.use("/api/v1/upload", uploadRoutes);

const PORT = process.env.PORT || 4000;

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.listen(PORT, () => {
  logger.info(`Server is now on port ${PORT}`);
  console.log(`Server started on port ${PORT}`);
});
