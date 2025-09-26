import express from "express";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors";
import routes from "../routes";
import { errorHandler } from "../middlewares/error.middleware";

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3003',
  'https://rentkar-dms-frontend-atrl.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", routes);
app.get("/api/health", (req,res)=>res.send("backend is running"))

app.use(errorHandler);

export default app;
