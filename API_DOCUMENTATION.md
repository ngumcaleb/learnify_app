# Learnify API Documentation

## Base URL
```
https://api.learnify.com/v1
```

## Authentication
All requests require an API key in the header:
```
Authorization: Bearer YOUR_API_KEY
```

## Endpoints

### GET /api/courses
Returns a list of all available courses.

**Response:**
```json
{
  "courses": [
    {
      "id": 1,
      "title": "React for Beginners",
      "description": {
        "intro": "Learn the fundamentals of React, JSX, and component-based development.",
        "scope": [
          "Build modern web applications with React",
          "Understand component-based architecture",
          "Manage state with hooks",
          "Handle events and forms",
          "Deploy production-ready React apps"
        ]
      },
      "category": "Frontend Development",
      "imageUrl": "https://picsum.photos/400/200?random=1",
      "difficulty": "beginner"
    }
  ]
}
```

### GET /api/courses/:id
Returns detailed information for a specific course.

**Parameters:**
- `id` (number): Course ID

**Response:**
```json
{
  "course": {
    "id": 1,
    "title": "React for Beginners",
    "description": {
      "intro": "Learn the fundamentals of React, JSX, and component-based development.",
      "scope": [
        "Build modern web applications with React",
        "Understand component-based architecture",
        "Manage state with hooks",
        "Handle events and forms",
        "Deploy production-ready React apps"
      ]
    },
    "category": "Frontend Development",
    "imageUrl": "https://picsum.photos/400/200?random=1",
    "difficulty": "beginner",
    "lessonCount": 10,
    "duration": "8 hours"
  }
}
```

### GET /api/lessons/:courseId
Returns all lessons for a specific course.

**Parameters:**
- `courseId` (number): Course ID

**Response:**
```json
{
  "lessons": [
    {
      "id": 1,
      "title": "Intro to React",
      "content": "# Introduction to React\n\nReact is a JavaScript library for building user interfaces...",
      "difficulty": "easy",
      "courseId": 1,
      "imageUrl": "https://picsum.photos/400/200?random=1",
      "description": "Learn the basics of React and JSX",
      "duration": 30,
      "order": 1
    }
  ]
}
```

## Error Responses
All endpoints return standard HTTP status codes:

- `200`: Success
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `500`: Internal Server Error

Error response format:
```json
{
  "error": {
    "code": "COURSE_NOT_FOUND",
    "message": "The requested course does not exist"
  }
}
```

## Rate Limiting
- 1000 requests per hour per API key
- Rate limit headers included in responses:
  - `X-RateLimit-Limit`: Maximum requests per hour
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Time when limit resets (Unix timestamp)

## Data Types

### Course
```typescript
interface Course {
  id: number;
  title: string;
  description: {
    intro: string;
    scope: string[];
  };
  category?: string;
  imageUrl?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  lessonCount?: number;
  duration?: string;
}
```

### Lesson
```typescript
interface Lesson {
  id: number;
  title: string;
  content?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  courseId: number;
  imageUrl?: string;
  description?: string;
  duration?: number; // in minutes
  order?: number;
}
```

## Testing
Use the following test API key for development:
```
test-api-key-12345
```

Example request:
```bash
curl -H "Authorization: Bearer test-api-key-12345" \
     https://api.learnify.com/v1/courses