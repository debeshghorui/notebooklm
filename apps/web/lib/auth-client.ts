import { createAuthClient } from "better-auth/react";

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export const authClient = createAuthClient({
    baseURL,
    fetchOptions: {
        credentials: "include",
    },
});

export const { signIn, signOut, useSession } = authClient;
