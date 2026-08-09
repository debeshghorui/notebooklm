import express from "express";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";

import auth from "./lib/auth.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { registerRoutes } from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// CORS middleware
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "http://localhost:3000",
        credentials: true,
    }),
);

// Better Auth middleware
app.all("/api/auth/{*any}", toNodeHandler(auth));

// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/health", (_req, res) => {
    res.send("OK").status(200);
});

// Register routes
registerRoutes(app);

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(
        `Server is running on port ${PORT} at http://localhost:${PORT}`,
    );
});
