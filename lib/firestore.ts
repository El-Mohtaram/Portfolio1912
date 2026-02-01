import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Project } from "@/lib/types";

export async function getProjects(): Promise<Project[]> {
    try {
        // Fetch 'projects' collection
        // Optional: Add orderBy("createdAt", "desc") if you add a date field later
        const q = query(collection(db, "projects"));
        const querySnapshot = await getDocs(q);

        const projects = querySnapshot.docs.map((doc) => {
            const data = doc.data();

            // We explicitly cast the data to ensure it matches our Interface
            return {
                id: doc.id,
                title: data.title || "Untitled Project",
                category: data.category || "Design",
                description: data.description || "",
                details: data.details || "",
                // Cloudinary URLs will be inside these fields:
                thumbnail: data.thumbnail || { type: "image", src: "" },
                gallery: data.gallery || [],
                detailsLink: data.detailsLink || `/project/${doc.id}`,
                width: Number(data.width) || 1,  // Ensure numbers are actually numbers
                height: Number(data.height) || 1,
            } as Project;
        });

        return projects;
    } catch (error) {
        console.error("🔥 Error fetching projects from Firebase:", error);
        // Return empty array so the site doesn't crash
        return [];
    }
}