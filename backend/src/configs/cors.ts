// TODO: CORS Configuration
import { CorsOptions } from "cors";

const allowedOrigins = process.env.FRONTEND_URL || "http://localhost:5173";

const corsOptions: CorsOptions = {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
    credentials: true, // Allow cookies to be sent with requests
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
}

export default corsOptions;