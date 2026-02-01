import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Work Together",
    description: "Ready to start your next project? Let's collaborate and create something extraordinary.",
    openGraph: {
        title: "Work Together | Mohanud Hassan",
        description: "Ready to start your next project? Let's collaborate and create something extraordinary.",
        images: ["/creative-workspace.png"],
    },
};

export default function WorkTogetherLayout({
                                               children,
                                           }: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}