import prisma from "../lib/db.js";
import type { CHAT_MODELS, CreateWorkspaceSchema, UpdateWorkspaceSchema } from "../validators/workspace.validator.js";

export const workspaceSelect = {
    id: true,
    title: true,
    description: true,
    icon: true,
    defaultModel: true,
    createdAt: true,
    updatedAt: true,
} as const;

export type WorkspaceRecord = {
    id: string;
    title: string;
    description: string | null;
    icon: string | null;
    createdAt: Date;
    updatedAt: Date;
};

export function findWorkspaceByUserId(id: string) {
    return prisma.workspace.findUnique({
        where: {
            id,
        },
        select: workspaceSelect,
        orderBy: {
            updatedAt: "desc",
        },
    });
};

export function findWorkspaceByIdAndUserId(workspaceId: string, userId: string) {
    return prisma.workspace.findUnique({
        where: {
            id: workspaceId,
            userId,
        },
        select: workspaceSelect,
    })
};

export function createWorkspaceRecord(userId: string, data: CreateWorkspaceSchema) {
    return prisma.workspace.create({
        data: {
            userId: userId,
            ...data,
        },
        select: workspaceSelect,
    })
};

export function updateWorkspaceRecord(workspaceId: string, data: UpdateWorkspaceSchema) {
    return prisma.workspace.update({
        where: {
            id: workspaceId,
        },
        data: {
            ...data,
        },
        select: workspaceSelect,
    })
};

export function deleteWorkspaceRecord(workspaceId: string) {
    return prisma.workspace.delete({
        where: {
            id: workspaceId,
        },
    })
};
