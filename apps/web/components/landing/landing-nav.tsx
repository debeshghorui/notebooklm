"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRightIcon, BookOpenIcon } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { useSession } from "@/lib/auth-client";
import { Button } from "@repo/ui/components/button";
import { Spinner } from "@repo/ui/components/spinner";

export function LandingNav() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    return (
        <header className="sticky top-0 z-50 border-b border-border/50 bg-background/75 backdrop-blur-xl">
            <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
                <Link
                    href="/"
                    className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight"
                >
                    <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
                        <BookOpenIcon className="size-4" />
                    </span>
                    NotebookLM
                </Link>

                <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
                    <a href="#features" className="transition-colors hover:text-foreground">
                        Features
                    </a>
                    <a href="#workflow" className="transition-colors hover:text-foreground">
                        How it works
                    </a>
                    <a href="#outputs" className="transition-colors hover:text-foreground">
                        Outputs
                    </a>
                </nav>

                <div className="flex items-center gap-1.5">
                    <ThemeToggle />
                    {isPending ? (
                        <Spinner className="size-4" />
                    ) : session ? (
                        <Button
                            size="sm"
                            onClick={() => router.push("/dashboard")}
                        >
                            Dashboard
                            <ArrowRightIcon />
                        </Button>
                    ) : (
                        <>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="hidden sm:inline-flex"
                                onClick={() => router.push("/login")}
                            >
                                Sign in
                            </Button>
                            <Button
                                size="sm"
                                onClick={() => router.push("/login")}
                            >
                                Get started
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
