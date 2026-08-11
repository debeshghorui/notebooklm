"use client";

import { useSession } from "@/lib/auth-client";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@repo/ui/components/avatar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@repo/ui/components/card";
import { FileTextIcon, HeadphonesIcon, MessageSquareIcon } from "lucide-react";

const features = [
    {
        icon: FileTextIcon,
        title: "Source-grounded notes",
        description:
            "Add sources and get summaries, key topics, and citations you can verify.",
    },
    {
        icon: MessageSquareIcon,
        title: "Chat with your sources",
        description:
            "Ask questions and get answers grounded in the documents you provided.",
    },
    {
        icon: HeadphonesIcon,
        title: "Audio overviews",
        description:
            "Turn your sources into a lively podcast-style discussion in one click.",
    },
];

export default function DashboardPage() {
    const { data: session } = useSession();
    const user = session?.user;
    const firstName = user?.name?.split(" ")[0] ?? "there";

    return (
        <div className="flex flex-col gap-10">
            <section className="flex flex-col gap-6 rounded-3xl bg-linear-to-br from-primary/10 via-background to-background p-6 ring-1 ring-border/60 sm:p-10">
                <div className="flex items-center gap-4">
                    <Avatar size="lg" className="size-12">
                        {user?.image ? (
                            <AvatarImage
                                src={user.image}
                                alt={user.name ?? "User avatar"}
                            />
                        ) : null}
                        <AvatarFallback>
                            {(user?.name ?? "U").charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Welcome back
                        </p>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Hi, {firstName}
                        </h1>
                    </div>
                </div>
                <p className="max-w-2xl text-pretty text-muted-foreground">
                    You&apos;re signed in. Create your first notebook, add
                    sources, and start asking grounded questions.
                </p>
            </section>

            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                    <Card key={feature.title} className="gap-3">
                        <CardHeader>
                            <div className="flex size-9 items-center justify-center rounded-xl bg-muted text-foreground">
                                <feature.icon className="size-4" />
                            </div>
                            <CardTitle className="text-base">
                                {feature.title}
                            </CardTitle>
                            <CardDescription>
                                {feature.description}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </section>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle>Account</CardTitle>
                        <CardDescription>
                            Details from your authenticated session.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <dl className="grid gap-4 sm:grid-cols-2">
                            <div className="flex flex-col gap-1">
                                <dt className="text-xs text-muted-foreground">
                                    Name
                                </dt>
                                <dd className="text-sm font-medium">
                                    {user?.name ?? "—"}
                                </dd>
                            </div>
                            <div className="flex flex-col gap-1">
                                <dt className="text-xs text-muted-foreground">
                                    Email
                                </dt>
                                <dd className="text-sm font-medium">
                                    {user?.email ?? "—"}
                                </dd>
                            </div>
                        </dl>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
