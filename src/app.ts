import express from "express";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors";
import routes from "../routes";
import { errorHandler } from "../middlewares/error.middleware";

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000 || https://rentkar-dms-frontend-atrl.vercel.app',
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", routes);
app.get("/api/health", (req,res)=>res.send("backend is running"))

app.use(errorHandler);

export default app;
