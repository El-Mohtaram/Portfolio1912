import type { Project } from "./types"

/**
 * Portfolio projects displayed in the home page grid
 * Used by IntegratedHeroGrid component
 */
export const projects: Project[] = [
    {
        id: "1",
        slug: "modern-architecture",
        title: "Modern Architecture",
        category: "Architecture",
        description: "Contemporary residential design",
        details:
            "A stunning example of modern architecture featuring clean lines, large windows, and sustainable materials. This projects showcases the perfect blend of form and function.",
        thumbnail: {
            type: "image",
            src: "/modern-architecture-building.png",
        },
        gallery: [
            { type: "image", src: "/modern-architecture-building.png" },
            { type: "image", src: "/modern-living-room.png" },
            { type: "image", src: "/product-packaging-design.png" },
        ],
        detailsLink: "/projects/modern-architecture",
        width: 3,
        height: 4,
    },
    {
        id: "2",
        slug: "brand-identity",
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
        detailsLink: "/projects/brand-identity",
        width: 4,
        height: 3,
    },
    {
        id: "3",
        slug: "mobile-app-interface",
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
        detailsLink: "/projects/mobile-app-interface",
        width: 1,
        height: 1,
    },
    {
        id: "4",
        slug: "editorial-photography",
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
        detailsLink: "/projects/editorial-photography",
        width: 3,
        height: 4,
    },
    {
        id: "5",
        slug: "web-dashboard",
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
        detailsLink: "/projects/web-dashboard",
        width: 4,
        height: 3,
    },
    {
        id: "6",
        slug: "product-packaging",
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
        detailsLink: "/projects/product-packaging",
        width: 1,
        height: 1,
    },
    {
        id: "7",
        slug: "interior-design",
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
        detailsLink: "/projects/interior-design",
        width: 4,
        height: 3,
    },
    {
        id: "8",
        slug: "logo-collection",
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
        detailsLink: "/projects/logo-collection",
        width: 3,
        height: 4,
    },
]