import express, {
  NextFunction,
  Request,
  Response,
  json,
  urlencoded,
} from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
import mongoose from "mongoose";

// Creating app and loading .env
const app = express();
dotenv.config();

// Loading middlewares
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
if (process.env.ENVIRONMENT == "DEV") {
  app.use(morgan("dev"));
}

// Loading routes
const path = `${require.main?.path}/routes`;
fs.readdirSync(path).forEach((file) => {
  try {
    const fileNameWithoutExtension = file.replace(".js", "");
    app.use(`/${fileNameWithoutExtension}`, require(`./routes/${file}`));
  } catch (error) {
    console.error(error);
  }
});

// Error handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message: error.message,
  });
});

// Loading mongoose
mongoose.connect(process.env.DATABASE_URL!);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("connected", () => console.log("Database connected"));

// Listening port
app.listen(process.env.PORT || 8000, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
