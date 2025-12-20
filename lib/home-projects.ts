import type { Project } from "./types"

/**
 * Portfolio projects displayed in the home page grid
 * Used by IntegratedHeroGrid component
 */
export const projects: Project[] = [
    {
        id: "1",
        title: "Modern Architecture",
        category: "Architecture",
        description: "Contemporary residential design",
        details:
            "A stunning example of modern architecture featuring clean lines, large windows, and sustainable materials. This project showcases the perfect blend of form and function.",
        thumbnail: {
            type: "image",
            src: "/modern-architecture-building.png",
        },
        gallery: [
            { type: "image", src: "/modern-architecture-building.png" },
            { type: "image", src: "/modern-living-room.png" },
            { type: "image", src: "/product-packaging-design.png" },
        ],
        detailsLink: "/project/1",
        width: 3,
        height: 4,
    },
    {
        id: "2",
        title: "Brand Identity Design",
        category: "Branding",
        description: "Complete visual identity system",
        details:
            "Comprehensive brand identity including logo design, color palette, typography, and brand guidelines. Created to establish a strong and memorable brand presence.",
        thumbnail: {
            type: "image",
            src: "/brand-identity-design-colorful.jpg",
        },
        gallery: [
            { type: "image", src: "/brand-identity-design-colorful.jpg" },
            { type: "image", src: "/logo-design-collection.jpg" },
            { type: "image", src: "/web-dashboard-analytics.png" },
        ],
        detailsLink: "/project/2",
        width: 4,
        height: 3,
    },
    {
        id: "3",
        title: "Mobile App Interface",
        category: "UI/UX",
        description: "Intuitive UX design",
        details:
            "User-centered mobile app design focusing on intuitive navigation and seamless user experience. Features modern UI patterns and accessibility best practices.",
        thumbnail: {
            type: "image",
            src: "/mobile-app-interface.png",
        },
        gallery: [
            { type: "image", src: "/mobile-app-interface.png" },
            { type: "image", src: "/web-dashboard-analytics.png" },
            { type: "image", src: "/editorial-fashion-photography.jpg" },
        ],
        detailsLink: "/project/3",
        width: 1,
        height: 1,
    },
    {
        id: "4",
        title: "Editorial Photography",
        category: "Photography",
        description: "Fashion editorial series",
        details:
            "High-fashion editorial photography series capturing contemporary style and elegance. Shot on location with professional lighting and post-production.",
        thumbnail: {
            type: "image",
            src: "/editorial-fashion-photography.jpg",
        },
        gallery: [{ type: "image", src: "/editorial-fashion-photography.jpg" }],
        detailsLink: "/project/4",
        width: 3,
        height: 4,
    },
    {
        id: "5",
        title: "Web Dashboard",
        category: "Web Design",
        description: "Data visualization dashboard",
        details:
            "Interactive web dashboard featuring real-time data visualization, analytics, and reporting tools. Built with modern web technologies for optimal performance.",
        thumbnail: {
            type: "image",
            src: "/web-dashboard-analytics.png",
        },
        gallery: [{ type: "image", src: "/web-dashboard-analytics.png" }],
        detailsLink: "/project/5",
        width: 4,
        height: 3,
    },
    {
        id: "6",
        title: "Product Packaging",
        category: "Packaging",
        description: "Eco-friendly packaging design",
        details:
            "Sustainable packaging design using recycled materials and eco-friendly printing processes. Combines environmental responsibility with attractive design.",
        thumbnail: {
            type: "image",
            src: "/product-packaging-design.png",
        },
        gallery: [{ type: "image", src: "/product-packaging-design.png" }],
        detailsLink: "/project/6",
        width: 1,
        height: 1,
    },
    {
        id: "7",
        title: "Interior Design",
        category: "Interior",
        description: "Minimalist interior concept",
        details:
            "Minimalist interior design emphasizing open space, natural light, and carefully curated furnishings. Creates a calm and sophisticated living environment.",
        thumbnail: {
            type: "image",
            src: "/modern-living-room.png",
        },
        gallery: [{ type: "image", src: "/modern-living-room.png" }],
        detailsLink: "/project/7",
        width: 4,
        height: 3,
    },
    {
        id: "8",
        title: "Logo Collection",
        category: "Branding",
        description: "Curated logo designs",
        details:
            "Collection of professional logo designs spanning various industries and styles. Each logo is crafted to be memorable, versatile, and timeless.",
        thumbnail: {
            type: "image",
            src: "/logo-design-collection.jpg",
        },
        gallery: [{ type: "image", src: "/logo-design-collection.jpg" }],
        detailsLink: "/project/8",
        width: 3,
        height: 4,
    },
]
