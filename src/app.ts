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
  'https://rentkar-dms-frontend-pxzy.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

// For development, allow all origins with credentials
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // In development, allow all origins for easier testing
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    
    // In production, only allow specified origins
    if (allowedOrigins.some(allowedOrigin => 
      origin === allowedOrigin || 
      origin.endsWith(process.env.VERCEL_URL || '')
    )) {
      return callback(null, true);
    }
    
    console.log('CORS blocked for origin:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'X-CSRF-Token',
    'Accept',
    'Accept-Version',
    'Content-Length',
    'Content-MD5',
    'Date',
    'X-Api-Version'
  ],
  exposedHeaders: [
    'Content-Range', 
    'X-Content-Range'
  ],
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  preflightContinue: false,
  maxAge: 600 // 10 minutes
};

app.use(cors(corsOptions));

// Handle OPTIONS requests for CORS preflight
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", routes);
app.get("/api/health", (req,res)=>res.send("backend is running"))

app.use(errorHandler);

export default app;
