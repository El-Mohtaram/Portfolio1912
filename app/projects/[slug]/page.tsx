import { projectsData } from "@/lib/projects-data"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ProjectDetailClient } from "@/components/project-detail-client"

interface PageProps {
    params: { slug: string }
}

// 1. توليد الميتا داتا (عشان صور الواتساب)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const project = Object.values(projectsData).find((p) => p.slug === params.slug)
    if (!project) return {}

    const ogImage = project.images?.[0] || "/placeholder.jpg"

    return {
        title: project.title,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            type: "article",
            images: [{ url: ogImage, width: 1200, height: 630 }],
        },
    }
}

// 2. الصفحة الرئيسية (بتسلم البيانات للملف التاني)
export default function ProjectPage({ params }: PageProps) {
    const project = Object.values(projectsData).find((p) => p.slug === params.slug)

    if (!project) notFound()

    // تجهيز المشاريع المقترحة
    const relatedProjects = Object.values(projectsData)
        .filter((p) => p.slug !== params.slug)
        .slice(0, 3)
        .map(p => ({ ...p, id: p.slug }))

    // تجهيز المشروع الحالي
    const projectWithId = { ...project, id: params.slug }

    // استدعاء ملف العميل
    return <ProjectDetailClient project={projectWithId as any} relatedProjects={relatedProjects as any} />
}