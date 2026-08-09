import type { Request, Response } from "express";
import {
    deleteWorkspaceForUser,
    getWorkspaceByIdForUser,
    updateWorkspaceForUser,
} from "../services/workspace.services.js";
import {
    createWorkspaceRecord,
    findWorkspaceByUserId,
} from "../repositories/workspace.repository.js";
import {
    createWorkspaceSchema,
    updateWorkspaceSchema,
} from "../validators/workspace.validator.js";


export async function listWorkspaces(req: Request, res: Response) {
    const workspaces = await findWorkspaceByUserId(req.session.user.id);
    res.json(workspaces);
}

export async function getWorkspace(req: Request, res: Response) {
    const { workspaceId } = req.params;
    if (!workspaceId) {
        return res.status(400).json({ error: "Workspace ID is required" });
    }

    const workspace = await getWorkspaceByIdForUser(
        workspaceId as string,
        req.session.user.id,
    );

    res.json(workspace);
}

export async function createWorkspace(req: Request, res: Response) {
    const input = createWorkspaceSchema.parse(req.body);
    const workspace = await createWorkspaceRecord(
        req.session.user.id,
        input,
    );

    res.status(201).json(workspace);
}

export async function updateWorkspace(req: Request, res: Response) {
    const { workspaceId } = req.params;
    if (!workspaceId) {
        return res.status(400).json({ error: "Workspace ID is required" });
    }

    const input = updateWorkspaceSchema.parse(req.body);
    const workspace = await updateWorkspaceForUser(
        workspaceId as string,
        req.session.user.id,
        input,
    );

    res.json(workspace);
}

export async function deleteWorkspace(req: Request, res: Response) {
    const { workspaceId } = req.params;
    if (!workspaceId) {
        return res.status(400).json({ error: "Workspace ID is required" });
    }

    await deleteWorkspaceForUser(workspaceId as string, req.session.user.id);
    
    res.status(204).send();
}