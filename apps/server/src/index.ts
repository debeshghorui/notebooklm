import express from "express";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";

import auth from "./lib/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

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

app.listen(PORT, () => {
    console.log(
        `Server is running on port ${PORT} at http://localhost:${PORT}`,
    );
});
