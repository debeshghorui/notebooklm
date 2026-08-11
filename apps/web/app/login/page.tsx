"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Loader2, LockKeyholeIcon } from "lucide-react";

import { signIn, useSession } from "@/lib/auth-client";
import { Spinner } from "@repo/ui/components/spinner";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@repo/ui/components/card";

function GoogleIcon(props: React.ComponentProps<"svg">) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
            />
            <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
            />
            <path
                fill="#FBBC05"
                d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
            />
            <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"
            />
        </svg>
    );
}

function LoginContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") ?? "/dashboard";
    const { data: session, isPending } = useSession();
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (isPending) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <Spinner className="size-6" />
            </div>
        );
    }

    if (session) {
        router.replace(redirect);
        return (
            <div className="flex flex-1 items-center justify-center gap-2 text-muted-foreground">
                <Spinner className="size-4" />
                <span className="text-sm">Redirecting…</span>
            </div>
        );
    }

    async function handleGoogleSignIn() {
        setError(null);
        setPending(true);
        try {
            await signIn.social({
                provider: "google",
                callbackURL: `${window.location.origin}${redirect}`,
            });
        } catch (err) {
            setPending(false);
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong. Please try again.",
            );
        }
    }

    return (
        <div className="flex w-full max-w-sm flex-col gap-6">
            <div className="flex flex-col gap-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Welcome back
                </h1>
                <p className="text-sm text-muted-foreground">
                    Sign in to your NotebookLM workspace
                </p>
            </div>

            <Card size="sm">
                <CardHeader>
                    <CardTitle className="text-base">Sign in</CardTitle>
                    <CardDescription>
                        Continue with Google to access your notebooks.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={pending}
                        className="group/google inline-flex h-11 w-full items-center justify-center gap-3 rounded-xl bg-background text-sm font-medium ring-1 ring-border transition-all hover:bg-muted/60 hover:ring-foreground/20 focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-60"
                    >
                        {pending ? (
                            <Loader2 className="size-4 animate-spin" />
                        ) : (
                            <GoogleIcon className="size-5" />
                        )}
                        <span>
                            {pending
                                ? "Redirecting to Google…"
                                : "Continue with Google"}
                        </span>
                    </button>

                    {error && (
                        <p
                            role="alert"
                            className="mt-4 rounded-lg bg-destructive/10 px-3 py-2 text-center text-xs text-destructive"
                        >
                            {error}
                        </p>
                    )}
                </CardContent>
            </Card>

            <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                <LockKeyholeIcon className="size-3" />
                By continuing you agree to our Terms and Privacy Policy.
            </p>
        </div>
    );
}

export default function LoginPage() {
    return (
        <main className="relative flex min-h-svh flex-1 overflow-hidden bg-background">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10"
            >
                <div className="absolute -top-40 left-1/2 size-160 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 size-120 translate-x-1/3 translate-y-1/3 rounded-full bg-chart-2/10 blur-3xl" />
                <div className="absolute left-0 top-1/3 size-96 -translate-x-1/3 rounded-full bg-chart-4/10 blur-3xl" />
            </div>

            <section className="relative hidden flex-1 flex-col justify-between overflow-hidden bg-zinc-950 p-12 text-zinc-50 lg:flex">
                <div
                    aria-hidden
                    className="absolute inset-0 -z-10 opacity-60"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 20% 20%, rgba(139,152,134,0.25), transparent 45%), radial-gradient(circle at 80% 70%, rgba(96,116,88,0.3), transparent 50%)",
                    }}
                />
                <div className="flex items-center gap-2 text-sm font-medium">
                    <div className="flex size-7 items-center justify-center rounded-lg bg-zinc-50 text-zinc-900">
                        <ArrowRight className="size-4" />
                    </div>
                    NotebookLM
                </div>

                <div className="flex max-w-md flex-col gap-5">
                    <h2 className="text-balance text-4xl font-semibold leading-tight tracking-tight">
                        Your sources, summarized and ready to chat with.
                    </h2>
                    <p className="text-pretty text-zinc-400">
                        Drop in papers, podcasts, and notes. NotebookLM turns
                        them into study guides, briefings, and grounded
                        answers — all from your own material.
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {[
                            "Source-grounded",
                            "Audio overviews",
                            "Private by design",
                        ].map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full bg-zinc-50/10 px-3 py-1 text-xs text-zinc-200 ring-1 ring-zinc-50/15"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <p className="text-xs text-zinc-500">
                    © {new Date().getFullYear()} NotebookLM. All rights
                    reserved.
                </p>
            </section>

            <section className="flex flex-1 items-center justify-center p-6 sm:p-10">
                <Suspense
                    fallback={
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Spinner className="size-4" />
                            <span className="text-sm">Loading…</span>
                        </div>
                    }
                >
                    <LoginContent />
                </Suspense>
            </section>
        </main>
    );
}
