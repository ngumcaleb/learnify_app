# Learnify Frontend Developer Take-Home Exercise

## Overview
This exercise evaluates your ability to work with React, TypeScript, API integration, and state management. You'll be working on a learning platform called Learnify that currently uses dummy data and needs to be enhanced with real API integration and Redux state management.

**Estimated Time: 4 hours**

## Current State
The app is a React + TypeScript learning platform with:
- Course listing and details pages
- Lesson viewing with markdown content
- Dark mode support
- Responsive design with Tailwind CSS

## Exercise Requirements

### Phase 1: Fix Routing Issues (30 minutes)
**Current Problem**: Course details page doesn't properly display course-specific lessons.

**Tasks**:
1. Fix the course details routing to properly filter and display lessons for the selected course
2. Ensure lesson navigation works correctly from course details
3. Add proper error handling for invalid course/lesson IDs

### Phase 2: API Integration (1.5 hours)
**API Endpoints** (will be provided):
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

## Evaluation Criteria
- **Functionality**: All features work as expected
- **Code Quality**: Clean, readable, well-structured code
- **TypeScript**: Proper typing throughout
- **State Management**: Correct Redux implementation
- **API Integration**: Proper error handling and loading states
- **UI/UX**: Maintains existing design and responsiveness

## Setup Instructions
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. API will be provided at runtime

## Submission
- Ensure all features work correctly
- Code should be committed to a git repository
- Include a brief README explaining your implementation decisions
- Test all functionality before submission

## Time Breakdown Suggestion
- Phase 1: 30 minutes
- Phase 2: 90 minutes
- Phase 3: 90 minutes
- Phase 4: 30 minutes (bonus)
- Testing & Polish: 30 minutes

Good luck! 🚀