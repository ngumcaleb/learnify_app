import { Routes, Route, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import LessonPage from './pages/LessonPage'
import Navbar from './components/NavBar'
import Footer from './components/Footer'
import { DarkModeProvider } from './context/DarkModeContext'
import { CourseDetails } from './pages/CourseDetails'
import { Home } from './pages/Home'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { fetchCourses } from './store/slices/coursesSlice'
import { fetchLessonsByCourse } from './store/slices/lessonsSlice'

// Wrapper components to handle routing logic
const CourseDetailsWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const courseId = id ? Number(id) : 0
  const dispatch = useAppDispatch()
  // Select from Redux
  const { items: courseItems, status: courseStatus, error: courseError } = useAppSelector(s => s.courses)
  const courseFromStore = courseItems.find(c => c.id === courseId)
  const lessonsState = useAppSelector(s => s.lessons)
  const courseLessonsFromStore = lessonsState.byCourse[courseId] || []
  const lessonsStatus = lessonsState.statusByCourse[courseId]
  const lessonsError = lessonsState.errorByCourse[courseId]

  const course = courseFromStore
  const courseLessons = courseLessonsFromStore

  useEffect(() => {
    dispatch(fetchCourses())
    dispatch(fetchLessonsByCourse(courseId))
  }, [dispatch, courseId])

  const loading = courseStatus === 'loading' || lessonsStatus === 'loading'
  const error = lessonsError || courseError || null
  if (loading) return <div className="text-gray-600 dark:text-gray-300">Loading...</div>
  if (error) return <div className="text-red-600 dark:text-red-400">{error}</div>
  return <CourseDetails course={course} lessons={courseLessons} />
}

const LessonPageWrapper: React.FC = () => {
  // Let LessonPage resolve the lesson from store or fetch by id
  return <LessonPage />
}

export default function App() {
  return (
    <DarkModeProvider>
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        <main className="container mx-auto px-4 py-6 flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/courses/:id"
              element={<CourseDetailsWrapper />}
            />

            <Route
              path="/lessons/:id"
              element={<LessonPageWrapper />}
            />
        </Routes>
      </main>
      <Footer />
    </div>
    </DarkModeProvider >
  )
}