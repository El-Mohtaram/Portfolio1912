// Unified Media System for Modal Carousel and Grid
export type MediaType = "image" | "video" | "youtube"

export interface ProjectMedia {
  type: MediaType
  src: string
  poster?: string // For video loading states
}

export interface Project {
  id: string
  title: string
  category: string
  description: string
  details: string
  thumbnail: ProjectMedia
  gallery: ProjectMedia[]
  width: number
  height: number
  detailsLink: string
}

export interface Brand {
  name: string
  logoSrc: string
}
