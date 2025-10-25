from flask import Blueprint, jsonify
from ...infrastructure.repositories.sqlite_lesson_repository import SQLiteLessonRepository
from ...application.use_cases.get_lessons_by_course import GetLessonsByCourse
from ..middleware.auth_middleware import require_api_key

lesson_bp = Blueprint('lesson', __name__)

# Initialize dependencies
lesson_repository = SQLiteLessonRepository()
# Avoid name collision with route function
get_lessons_by_course_uc = GetLessonsByCourse(lesson_repository)


@lesson_bp.route('/lessons', methods=['GET'])
@require_api_key
def get_all_lessons():
    """Get all lessons"""
    # This would need a new use case, but for now let's implement it directly
    from ...infrastructure.repositories.sqlite_lesson_repository import SQLiteLessonRepository
    lesson_repo = SQLiteLessonRepository()
    lessons = lesson_repo.get_all()
    from ...application.dto.lesson_dto import LessonDTO
    return jsonify(lessons)


@lesson_bp.route('/lessons/<int:lesson_id>', methods=['GET'])
@require_api_key
def get_lesson(lesson_id):
    """Get a specific lesson by ID"""
    from ...infrastructure.repositories.sqlite_lesson_repository import SQLiteLessonRepository
    lesson_repo = SQLiteLessonRepository()
    lesson = lesson_repo.get_by_id(lesson_id)
    if lesson is None:
        return jsonify({
            'error': {
                'code': 'LESSON_NOT_FOUND',
                'message': 'The requested lesson does not exist'
            }
        }), 404

    return jsonify(lesson)


@lesson_bp.route('/courses/<int:course_id>/lessons', methods=['GET'])
@require_api_key
def get_lessons_by_course(course_id):
    """Get all lessons for a specific course"""
    # Check course existence
    from ...infrastructure.repositories.sqlite_course_repository import SQLiteCourseRepository
    course_repo = SQLiteCourseRepository()
    course = course_repo.get_by_id(course_id)
    if course is None:
        return jsonify({
            'error': {
                'code': 'COURSE_NOT_FOUND',
                'message': 'The requested course does not exist'
            }
        }), 404

    # Fetch lessons via use case
    lessons = get_lessons_by_course_uc.execute(course_id)
    return jsonify(lessons)
