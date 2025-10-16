# Learnify API - Interview Exercise

## Overview
This is a Flask-based REST API for a learning platform called Learnify. The API provides endpoints to manage courses and lessons.

## Current Implementation
The following endpoints are already implemented:
- `GET /api/courses` - Get all courses
- `GET /api/courses/{id}` - Get course by ID
- `GET /api/lessons` - Get all lessons
- `GET /api/lessons/{id}` - Get lesson by ID

## Interview Tasks

### Task 1: Implement `/api/courses/{course_id}/lessons` Route
**Objective:** Complete the implementation of the endpoint that returns all lessons for a specific course.

**Current State:**
- Route decorator is already added with `@require_api_key`
- Method signature is defined but implementation is missing
- TODO comments indicate what needs to be done

**Requirements:**
- Route: `GET /api/courses/{course_id}/lessons`
- Path parameter: `course_id` (integer)
- Return: Array of lessons belonging to the specified course
- Response format: JSON array of lesson objects
- Error handling: Return 404 if course doesn't exist

**Implementation Steps:**
1. Complete the `get_lessons_by_course` function in `src/api/routes/lesson_routes.py`
2. Use the existing `SQLiteLessonRepository.get_by_course_id(course_id)` method
3. Return lessons in the correct format matching the Lesson interface
4. Add proper error handling for non-existent courses
5. Handle case where course exists but has no lessons (return empty array)

### Task 2: Implement API Key Authentication Middleware
**Objective:** Complete the API key validation logic in the authentication middleware.

**Current State:**
- Decorator framework is in place
- Currently returns a placeholder error indicating validation is not implemented
- TODO comments indicate what needs to be implemented

**Requirements:**
- Check for `Authorization` header in requests
- Header format: `Bearer YOUR_API_KEY`
- Validate against `Config.VALID_API_KEYS`
- Return appropriate error responses for missing/invalid keys

**Implementation Steps:**
1. Complete the `require_api_key` decorator in `src/api/middleware/auth_middleware.py`
2. Extract the Authorization header from the request
3. Validate the header format (must start with "Bearer ")
4. Extract the API key token
5. Check if the token exists in `Config.VALID_API_KEYS`
6. Return proper JSON error responses with appropriate HTTP status codes
7. Allow request to proceed if validation passes

## Frontend Interfaces

```typescript
export interface Lesson {
  id: number
  title: string
  content?: string
  difficulty?: 'easy' | 'medium' | 'hard'
  courseId?: number
  imageUrl?: string
  description?: string
}

export interface Course {
  id: number
  title: string
  description?: {
    intro: string
    scope: string[]
  }
  category?: string
  imageUrl?: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
}
```

## Database
The application uses SQLite with the following tables:
- `courses`: Stores course information
- `lessons`: Stores lesson information with foreign key to courses

## Running the Application
```bash
python run.py
```

## API Documentation
Access the Swagger UI at: `http://localhost:5000/docs`

## Testing
- The database is pre-populated with 50 courses and ~400 lessons
- All existing endpoints should work without authentication
- Use the API documentation to test endpoints