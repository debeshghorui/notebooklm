import { z } from "zod";

export const CHAT_MODELS = [
    "gpt-4o",
    "gpt-4o-mini",
    "gpt-4.1",
    "gpt-4.1-mini",
] as const;

export const createWorkspaceSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, { message: "Title is required" })
        .max(50, { message: "Title must be less than 50 characters" }),
    description: z
        .string()
        .trim()
        .min(1, { message: "Description is required" })
        .max(200, { message: "Description must be less than 200 characters" }),
    icon: z
        .string()
        .trim()
        .min(1, { message: "Icon is required" })
        .max(50, { message: "Icon must be less than 50 characters" }),
    defaultModel: z.enum(CHAT_MODELS).optional(),
});

export const updateWorkspaceSchema = createWorkspaceSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: "At least one field must be provided",
    });

export type CreateWorkspaceSchema = z.infer<typeof createWorkspaceSchema>;
export type UpdateWorkspaceSchema = z.infer<typeof updateWorkspaceSchema>;
