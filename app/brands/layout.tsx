import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Brands",
    description: "A showcase of brands and companies I've had the privilege to work with.",
    openGraph: {
        title: "Brands & Clients | Mohanud Hassan",
        description: "A showcase of brands and companies I've had the privilege to work with.",
        // حطيت صورة بتجمع اللوجوهات أو البراندنج
        images: ["/tech-company-branding.png"],
    },
};

export default function BrandsLayout({
                                         children,
                                     }: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}