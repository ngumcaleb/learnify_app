import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Lesson } from '../../types/lesson'
import { getLessonsByCourse as apiGetLessonsByCourse } from '../../services/api'
import { getLesson as apiGetLesson } from '../../services/api'

export interface LessonsState {
  byCourse: Record<number, Lesson[]>
  statusByCourse: Record<number, 'idle' | 'loading' | 'succeeded' | 'failed'>
  errorByCourse: Record<number, string | null>
  lastFetchedAtByCourse: Record<number, number>
  byId: Record<number, Lesson>
  statusById: Record<number, 'idle' | 'loading' | 'succeeded' | 'failed'>
  errorById: Record<number, string | null>
}

const initialState: LessonsState = {
  byCourse: {},
  statusByCourse: {},
  errorByCourse: {},
  lastFetchedAtByCourse: {},
  byId: {},
  statusById: {},
  errorById: {},
}

// Per-course caching: skip if fetched within 60s
export const fetchLessonsByCourse = createAsyncThunk<Lesson[], number, { state: { lessons: LessonsState } }>(
  'lessons/fetchByCourse',
  async (courseId: number) => {
    const data = await apiGetLessonsByCourse(courseId)
    return data
  },
  {
    condition: (courseId, { getState }) => {
      const s = getState().lessons
      const status = s.statusByCourse[courseId]
      const last = s.lastFetchedAtByCourse[courseId]
      if (status === 'loading') return false
      if (last && Date.now() - last < 60_000) return false
      return true
    }
  }
)

// Fetch single lesson by ID with basic caching
export const fetchLessonById = createAsyncThunk<Lesson | null, number, { state: { lessons: LessonsState } }>(
  'lessons/fetchById',
  async (id: number) => {
    const data = await apiGetLesson(id)
    return data
  },
  {
    condition: (id, { getState }) => {
      const s = getState().lessons
      const status = s.statusById[id]
      if (status === 'loading') return false
      if (s.byId[id]) return false
      return true
    }
  }
)

const lessonsSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {
    setLessonsForCourse(state, action: PayloadAction<{ courseId: number; lessons: Lesson[] }>) {
      const { courseId, lessons } = action.payload
      state.byCourse[courseId] = lessons
      state.statusByCourse[courseId] = 'succeeded'
      state.errorByCourse[courseId] = null
      state.lastFetchedAtByCourse[courseId] = Date.now()
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLessonsByCourse.pending, (state, action) => {
        const courseId = action.meta.arg
        state.statusByCourse[courseId] = 'loading'
        state.errorByCourse[courseId] = null
      })
      .addCase(fetchLessonsByCourse.fulfilled, (state, action) => {
        const courseId = action.meta.arg
        state.byCourse[courseId] = action.payload
        state.statusByCourse[courseId] = 'succeeded'
        state.lastFetchedAtByCourse[courseId] = Date.now()
        // Index lessons by id
        for (const l of action.payload) state.byId[l.id] = l
      })
      .addCase(fetchLessonsByCourse.rejected, (state, action) => {
        const courseId = action.meta.arg
        state.statusByCourse[courseId] = 'failed'
        state.errorByCourse[courseId] = action.error.message || 'Failed to load lessons'
      })
      // Single lesson
      .addCase(fetchLessonById.pending, (state, action) => {
        const id = action.meta.arg
        state.statusById[id] = 'loading'
        state.errorById[id] = null
      })
      .addCase(fetchLessonById.fulfilled, (state, action) => {
        const id = action.meta.arg
        state.statusById[id] = 'succeeded'
        if (action.payload) {
          state.byId[id] = action.payload
          const cid = (action.payload as any).courseId
          if (cid) {
            const arr = state.byCourse[cid] || []
            if (!arr.find(l => l.id === id)) state.byCourse[cid] = [...arr, action.payload]
          }
        }
      })
      .addCase(fetchLessonById.rejected, (state, action) => {
        const id = action.meta.arg
        state.statusById[id] = 'failed'
        state.errorById[id] = action.error.message || 'Failed to load lesson'
      })
  }
})

export const { setLessonsForCourse } = lessonsSlice.actions
export default lessonsSlice.reducer
