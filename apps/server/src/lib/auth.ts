import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import prisma from "./db.js";

const trustedClientOrigins = [
    process.env.CORS_ORIGIN || "http://localhost:3000",
];

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    trustedOrigins: trustedClientOrigins,

    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
});

export default auth;
