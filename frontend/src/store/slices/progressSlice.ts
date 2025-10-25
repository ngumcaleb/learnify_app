import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit' // [AI]

export interface ProgressState {
  completedByLessonId: Record<number, boolean>
}

// [AI] Load persisted state
function loadState(): ProgressState {
  try {
    const raw = localStorage.getItem('learnify_progress')
    if (raw) return JSON.parse(raw)
  } catch {}
  return { completedByLessonId: {} }
}

const initialState: ProgressState = loadState()

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    toggleLesson(state, action: PayloadAction<number>) {
      const id = action.payload
      state.completedByLessonId[id] = !state.completedByLessonId[id]
      try { localStorage.setItem('learnify_progress', JSON.stringify(state)) } catch {}
    },
    setLessonCompleted(state, action: PayloadAction<{ id: number; completed: boolean }>) {
      const { id, completed } = action.payload
      state.completedByLessonId[id] = completed
      try { localStorage.setItem('learnify_progress', JSON.stringify(state)) } catch {}
    }
  }
})

export const { toggleLesson, setLessonCompleted } = progressSlice.actions
export default progressSlice.reducer
