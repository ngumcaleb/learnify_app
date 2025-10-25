# Learnify Execution Plan

## Goals
- Implement all exercise phases with clear, verifiable checklists.
- Maintain TS, styling, and responsiveness.
- Prepare for deployment-ready integration.

## Phases & Checklists

### Phase 1: Fix Routing Issues (Target: 30m)
- [x] Course details shows lessons filtered by `courseId`.
- [x] Lesson navigation works from course details.
- [x] Handle invalid course/lesson IDs with graceful UI.
   
### Phase 2: API Integration (Target: 90m)
- [x] Configure API client (base URL + `Authorization: Bearer <API_KEY>`).
- [x] Implement service functions: `getCourses()`, `getCourse(id)`, `getLessonsByCourse(courseId)`.
- [x] Replace dummy data usage with API calls in CourseDetails.
- [x] Add loading and error states in CourseDetails.
- [x] Replace dummy data usage with API calls in Home.
- [ ] Ensure TypeScript interfaces align with real responses.

### Phase 3: Redux State Management (Target: 90m)
- [ ] Install Redux Toolkit packages (npm install step pending).
- [x] Configure Redux store and Provider.
- [x] Courses slice: async thunks + caching.
- [x] Lessons slice: async thunks + per-course caching.
- [x] Progress slice: lesson completion with localStorage persistence.
- [ ] Wire components to Redux selectors/thunks (Home, CourseDetails in progress).

### Phase 4: Bonus (Target: 30m)
- [ ] Course content caching strategy (memoization/RTK caching).
- [ ] Optimistic updates for lesson completion.
- [ ] Progress indicators / additional UX polish.

## Backend Tasks (Unblocked First)
- [x] Implement `require_api_key` middleware (accept `test-api-key-12345`).
- [x] Implement `GET /api/courses/<course_id>/lessons` route.
- [ ] Verify other endpoints and Swagger docs.
- [ ] Run pytest and manual smoke tests.

## Frontend Tasks (Then)
- [x] Fix `App.tsx` routing to find items by id (not array index).
- [x] Adjust CourseDetails to pass only lessons for selected course.
- [x] Adjust LessonPage to resolve lesson by id.
- [x] Add API client + integrate initial calls (CourseDetails).
- [ ] Integrate Home with `getCourses()` and loading/error.

## API Reference (from API_DOCUMENTATION.md)
- Auth header: `Authorization: Bearer test-api-key-12345`.
- Endpoints:
  - GET `/api/courses`
  - GET `/api/courses/:id`
  - GET `/api/lessons/:courseId`

## Deliverables Checklist (from Evaluation Criteria)
- [ ] Source changes committed.
- [ ] README notes on Redux and API approach.
- [ ] App meets Phases 1–3.
- [ ] Functional tests pass for main flows.

## Timeboxing
- Phase 1: 30m
- Phase 2: 90m
- Phase 3: 90m
- Phase 4: 30m
- Testing/Polish: 30m

## Run Commands
- Backend: `cd backend && pip install -r requirements.txt && python run.py`
- Backend tests: `cd backend && python -m pytest tests/ -v`
- Frontend: `cd frontend && npm install && npm run dev`
