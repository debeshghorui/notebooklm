import type { Express } from "express";

import { workspaceRoutes } from "./workspace.routes.js";

export function registerRoutes(app: Express) {
    app.use("/api/v1/workspaces", workspaceRoutes);
}
