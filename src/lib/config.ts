export const API_CONFIG = {
  BASE_URL: 'http://140.245.107.84:3000',
  ENDPOINTS: {
    COURSES: '/v1/courses',
    INSTRUCTORS: '/v1/instructors',
    TUTORIALS: '/v1/tutorials',
    STUDENTS: '/v1/students',
    STUDENT_COURSES: '/v1/student-courses'
  }
} as const;