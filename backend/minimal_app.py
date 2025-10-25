from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Mock data
courses = [
    {
        "id": 1,
        "title": "Introduction to React",
        "description": "Learn React fundamentals from scratch",
        "instructor": "John Doe",
        "duration": "10 hours",
        "level": "Beginner",
        "image": "/api/placeholder/300/200"
    },
    {
        "id": 2,
        "title": "Advanced TypeScript",
        "description": "Master TypeScript for large-scale applications", 
        "instructor": "Jane Smith",
        "duration": "15 hours",
        "level": "Advanced",
        "image": "/api/placeholder/300/200"
    },
    {
        "id": 3,
        "title": "Full Stack Development",
        "description": "Build complete web applications",
        "instructor": "Mike Johnson",
        "duration": "20 hours", 
        "level": "Intermediate",
        "image": "/api/placeholder/300/200"
    }
]

lessons = {
    1: [
        {"id": 1, "courseId": 1, "title": "React Components", "content": "Learn about React components and JSX", "duration": "45 minutes", "order": 1, "difficulty": "Beginner"},
        {"id": 2, "courseId": 1, "title": "State and Props", "content": "Understanding state and props in React", "duration": "60 minutes", "order": 2, "difficulty": "Beginner"},
        {"id": 3, "courseId": 1, "title": "React Hooks", "content": "Master React hooks like useState and useEffect", "duration": "50 minutes", "order": 3, "difficulty": "Intermediate"}
    ],
    2: [
        {"id": 4, "courseId": 2, "title": "TypeScript Basics", "content": "TypeScript fundamentals and type system", "duration": "40 minutes", "order": 1, "difficulty": "Beginner"},
        {"id": 5, "courseId": 2, "title": "Advanced Types", "content": "Advanced TypeScript types and generics", "duration": "55 minutes", "order": 2, "difficulty": "Advanced"}
    ],
    3: [
        {"id": 6, "courseId": 3, "title": "Backend Setup", "content": "Setting up your backend with Node.js", "duration": "50 minutes", "order": 1, "difficulty": "Intermediate"},
        {"id": 7, "courseId": 3, "title": "Frontend Integration", "content": "Connecting frontend to backend APIs", "duration": "65 minutes", "order": 2, "difficulty": "Intermediate"}
    ]
}

@app.route('/api/courses')
def get_courses():
    return jsonify(courses)

@app.route('/api/courses/<int:course_id>')
def get_course(course_id):
    course = next((c for c in courses if c['id'] == course_id), None)
    if not course:
        return jsonify({"error": f"Course with ID {course_id} not found"}), 404
    return jsonify(course)

@app.route('/api/courses/<int:course_id>/lessons')
def get_course_lessons(course_id):
    # Check if course exists first
    course_exists = any(c['id'] == course_id for c in courses)
    if not course_exists:
        return jsonify({"error": f"Course with ID {course_id} not found"}), 404
    
    course_lessons = lessons.get(course_id, [])
    return jsonify(course_lessons)

@app.route('/api/lessons/<int:lesson_id>')
def get_lesson(lesson_id):
    # Find lesson across all courses
    for course_lessons in lessons.values():
        lesson = next((l for l in course_lessons if l['id'] == lesson_id), None)
        if lesson:
            return jsonify(lesson)
    return jsonify({"error": f"Lesson with ID {lesson_id} not found"}), 404

if __name__ == '__main__':
    print("🚀 Starting Learnify Backend on http://localhost:5000")
    print("📚 Available endpoints:")
    print("   GET /api/courses")
    print("   GET /api/courses/<course_id>") 
    print("   GET /api/courses/<course_id>/lessons")
    print("   GET /api/lessons/<lesson_id>")
    app.run(debug=True, port=5000)