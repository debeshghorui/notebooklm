"use client";

import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { signOut, useSession } from "@/lib/auth-client";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@repo/ui/components/avatar";
import { Button } from "@repo/ui/components/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";

function initials(name?: string | null) {
    if (!name) return "U";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0]!.charAt(0).toUpperCase();
    return (
        parts[0]!.charAt(0) + parts[parts.length - 1]!.charAt(0)
    ).toUpperCase();
}

export function UserMenu() {
    const router = useRouter();
    const { data: session, isPending } = useSession();
    const [signingOut, setSigningOut] = useState(false);

    if (isPending || !session) {
        return (
            <Button variant="ghost" size="icon" disabled>
                <Avatar size="sm">
                    <AvatarFallback>…</AvatarFallback>
                </Avatar>
            </Button>
        );
    }

    const user = session.user;

    async function handleSignOut() {
        setSigningOut(true);
        try {
            await signOut({ fetchOptions: { credentials: "include" } });
        } finally {
            setSigningOut(false);
            router.replace("/login");
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Account menu"
                    >
                        <Avatar size="sm">
                            {user.image ? (
                                <AvatarImage
                                    src={user.image}
                                    alt={user.name ?? "User avatar"}
                                />
                            ) : null}
                            <AvatarFallback>{initials(user.name)}</AvatarFallback>
                        </Avatar>
                    </Button>
                }
            />
            <DropdownMenuContent align="end" sideOffset={8}>
                <DropdownMenuLabel>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">
                            {user.name ?? "User"}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">
                            {user.email}
                        </span>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    variant="destructive"
                    onClick={handleSignOut}
                    disabled={signingOut}
                >
                    <LogOutIcon />
                    {signingOut ? "Signing out…" : "Sign out"}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
