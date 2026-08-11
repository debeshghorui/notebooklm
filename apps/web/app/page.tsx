"use client";

import { useRouter } from "next/navigation";
import {
    ArrowRightIcon,
    BookMarkedIcon,
    BrainCircuitIcon,
    FileStackIcon,
    HeadphonesIcon,
    LayersIcon,
    MessageSquareQuoteIcon,
    ShieldCheckIcon,
    SparklesIcon,
    ZapIcon,
} from "lucide-react";

import { LandingNav } from "@/components/landing/landing-nav";
import { NotebookPreview } from "@/components/landing/notebook-preview";
import { useSession } from "@/lib/auth-client";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@repo/ui/components/card";
import { Separator } from "@repo/ui/components/separator";

const stats = [
    { value: "12+", label: "source types supported" },
    { value: "100%", label: "citation-backed answers" },
    { value: "< 2 min", label: "to first insight" },
];

const features = [
    {
        icon: FileStackIcon,
        title: "One notebook, every source",
        description:
            "Drop PDFs, articles, transcripts, and notes into a single workspace. NotebookLM keeps context across all of them.",
        className: "md:col-span-2",
    },
    {
        icon: MessageSquareQuoteIcon,
        title: "Ask with receipts",
        description:
            "Every answer links back to the passage it came from. Verify claims in one click.",
        className: "",
    },
    {
        icon: HeadphonesIcon,
        title: "Audio overviews",
        description:
            "Turn dense material into a podcast-style briefing you can listen to while commuting.",
        className: "",
    },
    {
        icon: BrainCircuitIcon,
        title: "Study guides on demand",
        description:
            "Generate FAQs, glossaries, and briefing docs tailored to the sources you selected.",
        className: "md:col-span-2",
    },
];

const workflow = [
    {
        step: "Upload",
        detail: "Add the documents, links, and notes you already have.",
    },
    {
        step: "Select",
        detail: "Choose which sources to include for a given question or output.",
    },
    {
        step: "Ask or generate",
        detail: "Chat, summarize, or create audio — all grounded in your material.",
    },
];

const outputs = [
    "Executive briefings",
    "Exam study guides",
    "Meeting recaps",
    "Research digests",
    "Onboarding packets",
    "Podcast scripts",
];

function HeroCta() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    if (isPending) return null;

    if (session) {
        return (
            <Button size="lg" onClick={() => router.push("/dashboard")}>
                Open your workspace
                <ArrowRightIcon />
            </Button>
        );
    }

    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button size="lg" onClick={() => router.push("/login")}>
                Start with Google
                <ArrowRightIcon />
            </Button>
            <Button
                variant="outline"
                size="lg"
                onClick={() =>
                    document
                        .getElementById("workflow")
                        ?.scrollIntoView({ behavior: "smooth" })
                }
            >
                See how it works
            </Button>
        </div>
    );
}

export default function Home() {
    return (
        <div className="relative flex min-h-svh flex-1 flex-col overflow-x-hidden bg-background">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
            >
                <div className="absolute -top-40 left-[10%] size-120 rounded-full bg-primary/12 blur-3xl" />
                <div className="absolute top-[30%] -right-20 size-96 rounded-full bg-chart-2/10 blur-3xl" />
                <div
                    className="absolute inset-0 opacity-[0.35] dark:opacity-[0.12]"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)",
                        backgroundSize: "28px 28px",
                    }}
                />
            </div>

            <LandingNav />

            <main className="flex-1">
                {/* Hero */}
                <section className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16 lg:py-24">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-5">
                            <Badge
                                variant="outline"
                                className="w-fit gap-2 px-3 py-1"
                            >
                                <SparklesIcon className="size-3" />
                                Source-grounded intelligence
                            </Badge>
                            <h1 className="max-w-xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.25rem]">
                                Turn scattered sources into{" "}
                                <span className="text-primary">
                                    answers you can trust
                                </span>
                            </h1>
                            <p className="max-w-lg text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                                NotebookLM is your research desk in the cloud.
                                Upload what you&apos;re reading, ask questions,
                                and get summaries, guides, and audio — always
                                tied back to the original material.
                            </p>
                        </div>

                        <HeroCta />

                        <dl className="grid grid-cols-3 gap-4 border-t border-border/60 pt-6">
                            {stats.map((stat) => (
                                <div key={stat.label} className="flex flex-col gap-1">
                                    <dt className="text-lg font-semibold tracking-tight sm:text-xl">
                                        {stat.value}
                                    </dt>
                                    <dd className="text-[11px] leading-snug text-muted-foreground sm:text-xs">
                                        {stat.label}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 lg:slide-in-from-right-4">
                        <NotebookPreview />
                    </div>
                </section>

                {/* Features bento */}
                <section
                    id="features"
                    className="border-y border-border/60 bg-muted/20 py-20"
                >
                    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
                        <div className="mb-12 flex max-w-2xl flex-col gap-3">
                            <p className="text-xs font-medium tracking-widest text-primary uppercase">
                                Built for deep work
                            </p>
                            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                                Everything you need to go from reading to
                                understanding
                            </h2>
                            <p className="text-muted-foreground">
                                No generic chatbot answers. NotebookLM works
                                only with the sources you provide — so you stay
                                in control of the knowledge base.
                            </p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            {features.map((feature) => (
                                <Card
                                    key={feature.title}
                                    className={`group h-full transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5 ${feature.className}`}
                                >
                                    <CardHeader>
                                        <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                            <feature.icon className="size-4" />
                                        </div>
                                        <CardTitle className="text-lg">
                                            {feature.title}
                                        </CardTitle>
                                        <CardDescription className="text-sm leading-relaxed">
                                            {feature.description}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Workflow */}
                <section id="workflow" className="py-20">
                    <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-start">
                        <div className="flex flex-col gap-4">
                            <p className="text-xs font-medium tracking-widest text-primary uppercase">
                                How it works
                            </p>
                            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                                Three steps from pile of PDFs to clear insight
                            </h2>
                            <p className="max-w-md text-muted-foreground">
                                Start with the material you already have. No
                                prompt engineering, no hunting through tabs.
                            </p>
                        </div>

                        <ol className="flex flex-col gap-0">
                            {workflow.map((item, index) => (
                                <li
                                    key={item.step}
                                    className="relative flex gap-5 pb-8 last:pb-0"
                                >
                                    {index < workflow.length - 1 ? (
                                        <span
                                            aria-hidden
                                            className="absolute top-10 left-4.5 h-[calc(100%-1.5rem)] w-px bg-border"
                                        />
                                    ) : null}
                                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                                        {index + 1}
                                    </span>
                                    <div className="flex flex-col gap-1 pt-1">
                                        <p className="font-medium">{item.step}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {item.detail}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* Outputs + trust */}
                <section
                    id="outputs"
                    className="border-t border-border/60 bg-zinc-950 py-20 text-zinc-50"
                >
                    <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-3">
                                <p className="text-xs font-medium tracking-widest text-zinc-400 uppercase">
                                    What you can create
                                </p>
                                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                                    One notebook, many deliverables
                                </h2>
                                <p className="max-w-lg text-zinc-400">
                                    The same sources can power a quick chat, a
                                    formal briefing, or an audio overview — without
                                    re-uploading anything.
                                </p>
                            </div>

                            <ul className="flex flex-wrap gap-2">
                                {outputs.map((output) => (
                                    <li
                                        key={output}
                                        className="rounded-full bg-zinc-50/8 px-3.5 py-1.5 text-sm text-zinc-200 ring-1 ring-zinc-50/12"
                                    >
                                        {output}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Card className="border-zinc-800 bg-zinc-900/80 text-zinc-50 ring-zinc-800">
                            <CardHeader>
                                <div className="flex size-10 items-center justify-center rounded-2xl bg-zinc-50/10 text-zinc-50">
                                    <ShieldCheckIcon className="size-4" />
                                </div>
                                <CardTitle className="text-zinc-50">
                                    Your sources stay yours
                                </CardTitle>
                                <CardDescription className="text-zinc-400">
                                    Notebooks are private to your account. Answers
                                    are generated from the files you add — not from
                                    the open web.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-4">
                                <Separator className="bg-zinc-800" />
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div className="flex items-start gap-3">
                                        <LayersIcon className="mt-0.5 size-4 shrink-0 text-zinc-400" />
                                        <div>
                                            <p className="text-sm font-medium">
                                                Scoped context
                                            </p>
                                            <p className="text-xs text-zinc-500">
                                                Pick which sources feed each answer.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <ZapIcon className="mt-0.5 size-4 shrink-0 text-zinc-400" />
                                        <div>
                                            <p className="text-sm font-medium">
                                                Fast to first answer
                                            </p>
                                            <p className="text-xs text-zinc-500">
                                                Upload and ask in minutes, not hours.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-20">
                    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
                        <div className="relative overflow-hidden rounded-[2rem] bg-linear-to-br from-primary/15 via-background to-chart-2/10 px-6 py-14 text-center ring-1 ring-border/60 sm:px-12">
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--primary)_0%,transparent_45%)] opacity-10"
                            />
                            <div className="relative flex flex-col items-center gap-6">
                                <BookMarkedIcon className="size-8 text-primary" />
                                <div className="flex max-w-xl flex-col gap-3">
                                    <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                                        Ready to build your first notebook?
                                    </h2>
                                    <p className="text-muted-foreground">
                                        Sign in with Google and start with the
                                        sources on your desk today.
                                    </p>
                                </div>
                                <HeroCta />
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t border-border/60 py-8">
                <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 text-xs text-muted-foreground sm:flex-row sm:px-6">
                    <p>© {new Date().getFullYear()} NotebookLM</p>
                    <p>Built for researchers, students, and teams who read for a living.</p>
                </div>
            </footer>
        </div>
    );
}
