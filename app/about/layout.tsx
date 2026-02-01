import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Me",
    description: "Learn more about Mohanud Hassan's journey, skills, and creative philosophy.",
    openGraph: {
        title: "About Me | Mohanud Hassan",
        description: "Learn more about Mohanud Hassan's journey, skills, and creative philosophy.",
        images: ["/professional-portrait.png"], // الصورة اللي هتظهر لما تبعت لينك About
    },
};

export default function AboutLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}