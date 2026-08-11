"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useSession } from "@/lib/auth-client";
import { Spinner } from "@repo/ui/components/spinner";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/login");
        }
    }, [isPending, session, router]);

    if (isPending) {
        return (
            <div className="flex flex-1 items-center justify-center py-32">
                <Spinner className="size-6" />
            </div>
        );
    }

    if (!session) {
        return (
            <div className="flex flex-1 items-center justify-center py-32 text-sm text-muted-foreground">
                Redirecting to sign in…
            </div>
        );
    }

    return <>{children}</>;
}
