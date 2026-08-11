"use client";

import {
    FileTextIcon,
    HeadphonesIcon,
    MicIcon,
    SparklesIcon,
    VideoIcon,
} from "lucide-react";

const sources = [
    { label: "Research paper.pdf", type: "pdf", active: true },
    { label: "Team standup notes", type: "doc", active: true },
    { label: "Product demo", type: "video", active: false },
    { label: "Market brief", type: "doc", active: false },
];

const messages = [
    {
        role: "user" as const,
        text: "What are the three main risks mentioned across my sources?",
    },
    {
        role: "assistant" as const,
        text: "Based on Research paper.pdf and Team standup notes, the recurring risks are timeline slip, vendor dependency, and unclear success metrics.",
        cite: "Research paper.pdf · p.12",
    },
];

function SourceIcon({ type }: { type: string }) {
    if (type === "video") return <VideoIcon className="size-3.5" />;
    return <FileTextIcon className="size-3.5" />;
}

export function NotebookPreview() {
    return (
        <div className="relative mx-auto w-full max-w-xl">
            <div
                aria-hidden
                className="absolute -inset-4 rounded-[2rem] bg-linear-to-br from-primary/20 via-transparent to-chart-2/20 blur-2xl"
            />

            <div className="relative overflow-hidden rounded-[1.75rem] border border-border/70 bg-card/90 shadow-2xl shadow-primary/5 ring-1 ring-foreground/5 backdrop-blur-sm">
                <div className="flex items-center gap-2 border-b border-border/60 bg-muted/40 px-4 py-3">
                    <div className="flex gap-1.5">
                        <span className="size-2.5 rounded-full bg-foreground/15" />
                        <span className="size-2.5 rounded-full bg-foreground/15" />
                        <span className="size-2.5 rounded-full bg-foreground/15" />
                    </div>
                    <span className="ml-2 font-mono text-[11px] text-muted-foreground">
                        q3-strategy-notebook
                    </span>
                    <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                        <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                        Live
                    </span>
                </div>

                <div className="grid min-h-88 grid-cols-[9.5rem_1fr] sm:grid-cols-[11rem_1fr]">
                    <aside className="border-r border-border/60 bg-muted/20 p-3">
                        <p className="mb-2 px-1 text-[10px] font-medium tracking-widest text-muted-foreground uppercase">
                            Sources
                        </p>
                        <ul className="flex flex-col gap-1.5">
                            {sources.map((source) => (
                                <li
                                    key={source.label}
                                    className={`flex items-center gap-2 rounded-xl px-2 py-2 text-[11px] transition-colors ${
                                        source.active
                                            ? "bg-primary/10 text-foreground ring-1 ring-primary/20"
                                            : "text-muted-foreground"
                                    }`}
                                >
                                    <SourceIcon type={source.type} />
                                    <span className="truncate">
                                        {source.label}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <button
                            type="button"
                            className="mt-3 flex w-full items-center justify-center gap-1 rounded-xl border border-dashed border-border/80 py-2 text-[10px] text-muted-foreground"
                        >
                            + Add source
                        </button>
                    </aside>

                    <div className="flex flex-col">
                        <div className="flex flex-1 flex-col gap-3 p-4">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`max-w-[92%] rounded-2xl px-3 py-2.5 text-[12px] leading-relaxed ${
                                        message.role === "user"
                                            ? "ml-auto bg-primary text-primary-foreground"
                                            : "bg-muted/60 text-foreground"
                                    }`}
                                >
                                    {message.text}
                                    {"cite" in message && message.cite ? (
                                        <p className="mt-2 font-mono text-[10px] text-muted-foreground">
                                            ↳ {message.cite}
                                        </p>
                                    ) : null}
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-border/60 p-3">
                            <div className="flex items-center gap-2 rounded-2xl bg-muted/50 px-3 py-2 ring-1 ring-border/60">
                                <SparklesIcon className="size-3.5 shrink-0 text-primary" />
                                <span className="truncate text-[11px] text-muted-foreground">
                                    Ask about your sources…
                                </span>
                                <MicIcon className="ml-auto size-3.5 text-muted-foreground" />
                            </div>
                            <div className="mt-2 flex gap-2">
                                <span className="inline-flex items-center gap-1 rounded-full bg-background px-2 py-1 text-[10px] text-muted-foreground ring-1 ring-border/60">
                                    <HeadphonesIcon className="size-3" />
                                    Audio overview
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full bg-background px-2 py-1 text-[10px] text-muted-foreground ring-1 ring-border/60">
                                    Study guide
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                aria-hidden
                className="absolute -right-6 -bottom-4 hidden rounded-2xl border border-border/60 bg-card/95 px-3 py-2 shadow-lg sm:block"
            >
                <p className="font-mono text-[10px] text-muted-foreground">
                    Citation match
                </p>
                <p className="text-sm font-semibold text-foreground">98.4%</p>
            </div>
        </div>
    );
}
