import { journey } from "../db/schema";

export interface Journey {
  id: number;
  role: string;
  company: string;
  year: string;
  description: string;
}
export interface Passion {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Project {
  id?: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
  featured: boolean;
  category: "Full-Stack" | "Back-End" | "Front-End";
}

export type JourneyItem = typeof journey.$inferSelect;
export type JourneyNew = typeof journey.$inferInsert;
