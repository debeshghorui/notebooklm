import type { NextFunction, Request, Response } from "express";
import multer from "multer";
import { ZodError } from "zod";
import { AppError, NotFoundError, ValidationError } from "../types/appError.js";
import { getZodFieldErrors } from "../utils/zodError.js";

export function errorHandler(error: Error, _req: Request, res: Response, next: NextFunction): void {
    // App errors
    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            error: error.message,
            ...(error.details ? { details: error.details } : {}),
        });
        return;
    }

    // Zod errors
    if (error instanceof ZodError) {
        res.status(400).json({
            error: "Validation Failed",
            details: getZodFieldErrors(error),
        });
        return;
    }

    // Multer errors
    if (error instanceof multer.MulterError) {
        res.status(400).json({ error: error.message });
        return;
    }

    // Custom errors
    if (error instanceof Error && error.message === "Only PDF files are allowed") {
        res.status(400).json({ error: error.message });
        return;
    }

    // Cloudinary errors
    const cloudinaryError = error as Error & { http_code?: number; name?: string };

    if (cloudinaryError.name === "UnexpectedResponse" && cloudinaryError.http_code === 403) {
        res.status(400).json({
            error: "Cloudinary upload rejected: your API key is missing Upload (create) permission. In Cloudinary Dashboard → Settings → API Keys, use the root secret or create a key with Upload enabled.",
        });
        return;
    }

    // Unknown errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
}