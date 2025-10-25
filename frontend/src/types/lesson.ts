export interface Lesson {
  id: number;
  courseId: number;
  title: string;
  content: string;
  duration: string;
  image:string;
  order: number;
  completed?: boolean;
  difficulty?: string; // Changed from "easy" | "medium" | "hard" to string
}