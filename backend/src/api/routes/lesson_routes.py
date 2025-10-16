from flask import Blueprint, jsonify
from ...infrastructure.repositories.sqlite_lesson_repository import SQLiteLessonRepository
from ...application.use_cases.get_lessons_by_course import GetLessonsByCourse
from ..middleware.auth_middleware import require_api_key

lesson_bp = Blueprint('lesson', __name__)

# Initialize dependencies
lesson_repository = SQLiteLessonRepository()
get_lessons_by_course = GetLessonsByCourse(lesson_repository)


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
    # TODO: Implement this endpoint
    # 1. Use SQLiteLessonRepository.get_by_course_id(course_id)
    # 2. Return lessons array or 404 if course doesn't exist
    # 3. Handle case where course exists but has no lessons
    pass
