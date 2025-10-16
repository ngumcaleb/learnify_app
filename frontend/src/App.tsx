import { Routes, Route, useParams } from 'react-router-dom'
import LessonPage from './pages/LessonPage'
import Navbar from './components/NavBar'
import { DarkModeProvider } from './context/DarkModeContext'
import { CourseDetails } from './pages/CourseDetails'
import { Home } from './pages/Home'
import courses from './dummydata/courses'
import lessons from './dummydata/lessons'

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
              element={
                (() => {
                  const { id } = useParams<{ id: string }>()
                  const courseId = id ? Number(id) : 0
                  const course = courses[courseId] || courses[0]
                  return <CourseDetails course={course} lessons={lessons} />
                })()
              }
            />

            <Route
              path="/lessons/:id"
              element={
                (() => {
                  const { id } = useParams<{ id: string }>()
                  const lessonId = id ? Number(id) : 0
                  const lesson = lessons[lessonId] || lessons[0]
                  return <LessonPage lesson={lesson} />
                })()
              }
            />
        </Routes>
      </main>
    </div>
    </DarkModeProvider >
  )
}