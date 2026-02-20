import { API_CONFIG } from '@/lib/constants/api';
import { Course, CourseModule } from '@/lib/types/courses';
import { apiRequest } from './client';

// API Response types
interface CoursesApiResponse {
  metadata: {
    total: number;
    filtered: number;
    grades: string[];
  };
  courses: Course[];
  pagination: {
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

// Course API functions
export const coursesApi = {
  // Get all courses
  getAllCourses: async (): Promise<CoursesApiResponse> => {
    return apiRequest<CoursesApiResponse>(API_CONFIG.ENDPOINTS.COURSES);
  },

  // Get courses by grade
  getAllCoursesByGrade: async (grade: string): Promise<CoursesApiResponse> => {
    return apiRequest<CoursesApiResponse>(`${API_CONFIG.ENDPOINTS.COURSES}?grade=${grade}`);
  },

  // Get course modules by course unit ID
  getModules: (courseUnitId: string): Promise<CourseModule[]> => {
    return apiRequest<CourseModule[]>(`${API_CONFIG.ENDPOINTS.COURSE_MODULES}/${courseUnitId}`);
  },
};

// Helper function to get all courses
export const getAllCourses = async (): Promise<CoursesApiResponse> => {
  try {
    const response = await coursesApi.getAllCourses();
    return response;
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    return {
      metadata: { total: 0, filtered: 0, grades: [] },
      courses: [],
      pagination: { limit: 12, offset: 0, hasMore: false }
    };
  }
};

// Helper function to get courses by grade
export const getCoursesByGrade = async (grade: string = 'AL'): Promise<CoursesApiResponse> => {
  try {
    const response = await coursesApi.getAllCoursesByGrade(grade);
    return response;
  } catch (error) {
    console.error('Failed to fetch courses with instructors:', error);
    return {
      metadata: { total: 0, filtered: 0, grades: ['AL'] },
      courses: [],
      pagination: { limit: 12, offset: 0, hasMore: false }
    };
  }
};

// Export the type for use in components
export type { CoursesApiResponse };
