import React, { useEffect, useMemo, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import ReactMarkdown from 'react-markdown'
import type { Lesson } from '../types/lesson'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchLessonsByCourse, fetchLessonById } from '../store/slices/lessonsSlice'

export const LessonPage: React.FC<{ lesson?: Lesson }> = ({ lesson: propLesson }) => {
  const { id } = useParams()
  const [completed, setCompleted] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const numericId = Number(id)

  // Resolve current lesson from prop → store.byId → store.byCourse
  const store = useAppSelector(s => s.lessons)
  const lessonFromId = store.byId[numericId]
  const lessonFromCourse = useMemo(() => {
    for (const cid in store.byCourse) {
      const found = store.byCourse[Number(cid)]?.find(l => l.id === numericId)
      if (found) return found
    }
    return undefined
  }, [store.byCourse, numericId])

  const lesson = propLesson || lessonFromId || lessonFromCourse
  const courseId = lesson?.courseId

  // Ensure lessons for this course are loaded
  useEffect(() => {
    if (courseId) dispatch(fetchLessonsByCourse(courseId))
  }, [dispatch, courseId])

  // Ensure single lesson is loaded if missing
  useEffect(() => {
    if (!lesson && numericId) dispatch(fetchLessonById(numericId))
  }, [dispatch, lesson, numericId])

  // Order lessons in the course
  const courseLessons = (courseId ? useAppSelector(s => s.lessons.byCourse[courseId]) : []) || []
  const ordered = useMemo(() => {
    return [...courseLessons].sort((a, b) => {
      const ao = (a as any).order ?? (a as any).lessonOrder ?? a.id
      const bo = (b as any).order ?? (b as any).lessonOrder ?? b.id
      return ao - bo
    })
  }, [courseLessons])

  const idx = lesson ? ordered.findIndex(l => l.id === lesson.id) : -1
  const prevLesson = idx > 0 ? ordered[idx - 1] : undefined
  const nextLesson = idx >= 0 && idx < ordered.length - 1 ? ordered[idx + 1] : undefined

  const markdownContent = (lesson as any)?.content || `# Lesson ${numericId}\n\nContent will appear here when available.`

  // Difficulty color
  const difficultyColor = (difficulty?: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700/30 dark:text-yellow-300'
      case 'advanced':
        return 'bg-red-100 text-red-700 dark:bg-red-700/30 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-300'
    }
  }

  if (!lesson) {
    return <div className="text-gray-600 dark:text-gray-300">Loading...</div>
  }

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-100">
        <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
        <span>/</span>
        <Link to={`/courses/${courseId || ''}`} className="hover:text-blue-600 dark:hover:text-blue-400">Course</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white">Lesson {id}</span>
      </div>

      {/* Lesson Card */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{lesson.title}</h1>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColor(lesson.difficulty)}`}>
            {lesson.difficulty}
          </span>
        </div>

        {/* Lesson Image */}
        <div className="relative mb-6 overflow-hidden rounded-xl shadow-md">
          {/* Support common image keys */}
          <img
            src={(lesson as any).imageUrl || (lesson as any).image || (lesson as any).image_url || 'https://picsum.photos/800/400'}
            alt={lesson.title}
            className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Markdown Body */}
        <div className="prose dark:prose-invert max-w-none text-gray-900 dark:text-white">
          <ReactMarkdown>
            {markdownContent}
          </ReactMarkdown>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button variant="primary" onClick={() => setCompleted(!completed)}>
            {completed ? '✓ Completed' : 'Mark as Complete'}
          </Button>
          {/* Prev/Next navigation */}
          {prevLesson && (
            <Link to={`/lessons/${prevLesson.id}`} className="btn-secondary">← Previous Lesson</Link>
          )}
          {nextLesson && (
            <Button variant="secondary" onClick={() => navigate(`/lessons/${nextLesson.id}`)}>
              Next Lesson →
            </Button>
          )}
        </div>
      </Card>

      {/* Resources Section */}
      <Card>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Additional Resources</h3>
        <div className="space-y-3">
          {[
            { name: '📄 Lesson Notes (PDF)', action: 'Download' },
            { name: '💻 Source Code', action: 'View' },
            { name: '🔗 Official Documentation', action: 'Open' },
          ].map((res) => (
            <a
              key={res.name}
              href="#"
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="text-gray-900 dark:text-white font-medium">{res.name}</span>
              <span className="text-blue-600 dark:text-blue-400">{res.action}</span>
            </a>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default LessonPage

