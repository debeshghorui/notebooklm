import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { AuthGuard } from "@/components/auth-guard";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthGuard>
            <div className="flex min-h-svh flex-1 flex-col bg-background">
                <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
                    <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-2 text-sm font-semibold tracking-tight"
                        >
                            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <ArrowRightIcon className="size-4" />
                            </span>
                            NotebookLM
                        </Link>
                        <div className="flex items-center gap-1.5">
                            <ThemeToggle />
                            <UserMenu />
                        </div>
                    </div>
                </header>
                <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
                    {children}
                </div>
            </div>
        </AuthGuard>
    );
}
