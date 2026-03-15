export const API_CONFIG = {
  ENDPOINTS: {
    COURSES: '/v1/course-units',
    COURSE_MODULES: '/v1/course-modules/course-unit',
    COURSE_MODULE_DETAILS: '/v1/course-modules',
    INSTRUCTORS: '/v1/instructors',
    TUTORIALS: '/v1/tutorials',
    STUDENTS: '/v1/students',
    STUDENT_COURSES: '/v1/student-courses',
    CREATE_ORDER: '/v1/purchases/create-order',
    VIDEO_PROGRESS: '/v1/course-module-videos/progress'
  }
} as const;