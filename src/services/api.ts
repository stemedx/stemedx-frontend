import { API_CONFIG } from '@/lib/config';
import { Course, Instructor, Subject, CreateCourseRequest, UpdateCourseRequest } from '@/types/api';

// Base API function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Course API functions
export const coursesApi = {
  // Get all courses
  getAll: (): Promise<Course[]> => {
    return apiRequest<Course[]>(API_CONFIG.ENDPOINTS.COURSES);
  },

  // Get single course by ID
  getById: (id: string): Promise<Course> => {
    return apiRequest<Course>(`${API_CONFIG.ENDPOINTS.COURSES}/${id}`);
  },

  // Create new course
  create: (courseData: CreateCourseRequest): Promise<Course> => {
    return apiRequest<Course>(API_CONFIG.ENDPOINTS.COURSES, {
      method: 'POST',
      body: JSON.stringify(courseData),
    });
  },

  // Update course
  update: (id: string, courseData: UpdateCourseRequest): Promise<Course> => {
    return apiRequest<Course>(`${API_CONFIG.ENDPOINTS.COURSES}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(courseData),
    });
  },

  // Delete course
  delete: (id: string): Promise<void> => {
    return apiRequest<void>(`${API_CONFIG.ENDPOINTS.COURSES}/${id}`, {
      method: 'DELETE',
    });
  },
};

// Instructor API functions
export const instructorsApi = {
  // Get all instructors
  getAll: (): Promise<Instructor[]> => {
    return apiRequest<Instructor[]>(API_CONFIG.ENDPOINTS.INSTRUCTORS);
  },

  // Get single instructor by ID
  getById: (id: string): Promise<Instructor> => {
    return apiRequest<Instructor>(`${API_CONFIG.ENDPOINTS.INSTRUCTORS}/${id}`);
  },
};

// Helper function to get course with instructor details
export const getCoursesWithInstructors = async (): Promise<(Course & { instructor: Instructor; subject: Subject })[]> => {
  try {
    const courses = await coursesApi.getAll();
    
    // API already returns instructor and subject data nested in each course
    // @ts-ignore
    return courses as (Course & { instructor: Instructor; subject: Subject })[];
  } catch (error) {
    console.error('Failed to fetch courses with instructors:', error);
    return [];
  }
};