import type { Course } from '../types/course'
import type { Lesson } from '../types/lesson'
import axios from 'axios'
import type { InternalAxiosRequestConfig } from 'axios' // [AI]


const BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:5000/api'
const API_KEY = (import.meta as any).env?.VITE_API_KEY || 'test-api-key-12345'
const api = axios.create({ baseURL: BASE_URL })
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers = config.headers || {}
  config.headers['Authorization'] = `Bearer ${API_KEY}`
  return config
})

// [AI] Normalize variant response shapes
function unwrapArray<T>(data: any, key: string): T[] {
  if (Array.isArray(data)) return data as T[]
  if (data && Array.isArray(data[key])) return data[key] as T[]
  return []
}

function unwrapObject<T>(data: any, key: string): T | null {
  if (data && typeof data === 'object' && !Array.isArray(data) && key in data) return data[key] as T
  if (data && typeof data === 'object') return data as T
  return null
}

export async function getCourses(): Promise<Course[]> {
  const { data } = await api.get<any>('/courses')
  return unwrapArray<Course>(data, 'courses')
}

export async function getCourse(id: number): Promise<Course | null> {
  const { data } = await api.get<any>(`/courses/${id}`)
  return unwrapObject<Course>(data, 'course')
}

export async function getLessonsByCourse(courseId: number): Promise<Lesson[]> {
  const { data } = await api.get<any>(`/courses/${courseId}/lessons`)
  return unwrapArray<Lesson>(data, 'lessons')
}

export async function getLesson(id: number): Promise<Lesson | null> {
  const { data } = await api.get<any>(`/lessons/${id}`)
  return unwrapObject<Lesson>(data, 'lesson')
}
