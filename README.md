# Learnify Frontend Developer Take-Home Exercise

## Overview
This exercise evaluates your ability to work with React, TypeScript, API integration, and state management. You'll be working on a learning platform called Learnify that currently uses dummy data and needs to be enhanced with real API integration and Redux state management.

**Estimated Time: 4 hours**

## Setup Instructions

### 1. Repository Setup
1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd learnify_app
   ```

2. Create your own branch for development:
   ```bash
   git checkout -b your-name-develop
   ```

   **Important:** The `master` branch contains the unattained (incomplete) version of the backend. Do not modify the master branch directly.

### 2. Backend Setup
The backend is a Flask-based REST API with the following structure:

- **`backend/config.py`**: Configuration settings including API keys and database path
- **`backend/run.py`**: Application entry point
- **`backend/src/api/app.py`**: Flask application factory and CORS setup
- **`backend/src/api/routes/`**: Route handlers for courses and lessons
- **`backend/src/api/middleware/auth_middleware.py`**: API key authentication (incomplete)
- **`backend/src/domain/entities/`**: Domain models for Course and Lesson
- **`backend/src/application/use_cases/`**: Business logic layer
- **`backend/src/application/dto/`**: Data transfer objects
- **`backend/src/infrastructure/database/`**: Database connection and models
- **`backend/src/infrastructure/repositories/`**: Data access layer with SQLite implementation

**Note:** The backend has incomplete authentication middleware and is missing a route for `/api/courses/{course_id}/lessons`.

### 3. Frontend Setup
The frontend is a React + TypeScript application with the following structure:

- **`frontend/src/App.tsx`**: Main application component with routing
- **`frontend/src/pages/`**: Page components (Home, CourseDetails, LessonPage)
- **`frontend/src/components/`**: Reusable UI components (Button, Card, NavBar, etc.)
- **`frontend/src/context/`**: React context for dark mode
- **`frontend/src/dummydata/`**: Mock data for courses and lessons
- **`frontend/src/types/`**: TypeScript interfaces for Course and Lesson
- **`frontend/package.json`**: Dependencies and scripts
- **`frontend/tailwind.config.cjs`**: Tailwind CSS configuration

**Note:** The frontend currently uses dummy data and needs API integration and Redux implementation.

### 4. Installation and Running
```bash
# Backend
cd backend
pip install -r requirements.txt
python run.py

# Frontend (in a separate terminal)
cd frontend
npm install
npm run dev
```

## Exercise Requirements

### Phase 1: Fix Routing Issues (30 minutes)
**Current Problem**: Course details page doesn't properly display course-specific lessons.

**Tasks**:
1. Fix the course details routing to properly filter and display lessons for the selected course
2. Ensure lesson navigation works correctly from course details
3. Add proper error handling for invalid course/lesson IDs

### Phase 2: API Integration (1.5 hours)
**API Endpoints**:
```
GET /api/courses          # Returns all courses
GET /api/courses/:id      # Returns specific course with details
GET /api/lessons/:courseId # Returns lessons for a specific course
```

**Tasks**:
1. Install and configure Axios or fetch for API calls
2. Create API service functions for all endpoints
3. Replace dummy data with API calls in components
4. Add loading states and error handling
5. Implement proper TypeScript interfaces for API responses

### Phase 3: Redux State Management (1.5 hours)
**Requirements**:
1. Install and configure Redux Toolkit
2. Create slices for:
   - Courses (with caching)
   - Lessons (with caching)
   - User progress (lesson completion status)
3. Implement async thunks for API calls
4. Persist lesson completion state to localStorage
5. Add loading and error states to Redux

### Phase 4: Bonus Features (30 minutes)
**Optional Enhancements**:
1. Add course content caching to reduce API calls
2. Implement optimistic updates for lesson completion
3. Add offline support with service worker
4. Create a progress indicator showing course completion percentage

## Technical Requirements
- Use TypeScript throughout
- Maintain existing styling and dark mode
- Ensure responsive design works on mobile
- Write clean, maintainable code with proper error handling
- Add appropriate loading states and user feedback

## Submission Requirements

### Final Submission
**CRITICAL: Your final submission MUST be hosted and fully functional.**

You must deploy both the backend API and frontend application to a hosting platform where they are integrated and working together. The submission should demonstrate:

- ✅ Backend API running and accessible
- ✅ Frontend application running and connected to the API
- ✅ All Phase 1-3 requirements completed
- ✅ No console errors or TypeScript errors
- ✅ Responsive design maintained
- ✅ Dark mode functionality preserved

### Hosting Recommendations
- **Backend**: Heroku, Railway, Render, or similar platform
- **Frontend**: Vercel, Netlify, or similar platform
- **Database**: SQLite (as provided) or cloud database service

### Submission Deadline
**Submission closes 4 days after receiving this test.**

Current time: 2025-10-16T19:24:59.724Z UTC
Deadline: 2025-10-20T19:24:59.724Z UTC

### How to Submit
1. Ensure your application is hosted and fully functional
2. Provide the live URLs for both backend and frontend
3. Include a brief README explaining your implementation decisions
4. Submit your hosted application links and any additional documentation

## Evaluation Criteria
- **Functionality**: All features work as expected
- **Code Quality**: Clean, readable, well-structured code
- **TypeScript**: Proper typing throughout
- **State Management**: Correct Redux implementation
- **API Integration**: Proper error handling and loading states
- **UI/UX**: Maintains existing design and responsiveness
- **Hosting**: Application is properly deployed and accessible

## Time Breakdown Suggestion
- Phase 1: 30 minutes
- Phase 2: 90 minutes
- Phase 3: 90 minutes
- Phase 4: 30 minutes (bonus)
- Testing & Deployment: 30 minutes

Good luck! 🚀