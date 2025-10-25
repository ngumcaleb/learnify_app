export interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  image?: string;
}

export interface Lesson {
  id: number;
  courseId: number;
  title: string;
  content: string;
  duration: string;
  order: number;
  completed?: boolean;
  difficulty?: string; // Changed from specific values to string
}

export interface UserProgress {
  lessonId: number;
  completed: boolean;
  progress: number;
  lastAccessed: Date;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface LoadingState {
  loading: boolean;
  error: string | null;
}