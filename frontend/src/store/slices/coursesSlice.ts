import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit' // [AI]
import type { Course } from '../../types/course'
import { getCourses as apiGetCourses } from '../../services/api'

export interface CoursesState {
  items: Course[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  lastFetchedAt: number | null
}

const initialState: CoursesState = {
  items: [],
  status: 'idle',
  error: null,
  lastFetchedAt: null,
}

// [AI] Basic caching: skip fetch if within 60s
export const fetchCourses = createAsyncThunk<Course[], void, { state: { courses: CoursesState } }>(
  'courses/fetchAll',
  async () => {
    const data = await apiGetCourses()
    return data
  },
  {
    condition: (_arg, { getState }) => {
      const { lastFetchedAt, status } = getState().courses
      if (status === 'loading') return false
      if (lastFetchedAt && Date.now() - lastFetchedAt < 60_000) return false
      return true
    }
  }
)

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses(state, action: PayloadAction<Course[]>) {
      state.items = action.payload
      state.lastFetchedAt = Date.now()
      state.status = 'succeeded'
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = 'succeeded'
        state.lastFetchedAt = Date.now()
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to load courses'
      })
  }
})

export const { setCourses } = coursesSlice.actions
export default coursesSlice.reducer
