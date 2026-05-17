import { API_CONFIG } from '@/lib/constants/api';
import { Course, CourseModule, CourseDetailsResponse, ModuleDetailsResponse } from '@/lib/types/courses';
import { serverApiRequest } from './server';

// Server-side Course API functions for use in Server Components
export const coursesServerApi = {
  // Get all courses — cache for 5 min, course list changes infrequently
  getAll: (): Promise<Course[]> => {
    return serverApiRequest<Course[]>(API_CONFIG.ENDPOINTS.COURSES, {}, { revalidate: 300 });
  },

  // Get single course by ID — cache for 5 min
  getById: (id: string): Promise<Course> => {
    return serverApiRequest<Course>(`${API_CONFIG.ENDPOINTS.COURSES}/${id}`, {}, { revalidate: 300 });
  },

  // Get course details — no cache, isPurchased must always be fresh
  getDetails: (id: string): Promise<CourseDetailsResponse> => {
    return serverApiRequest<CourseDetailsResponse>(`${API_CONFIG.ENDPOINTS.COURSES}/${id}`);
  },

  // Get course modules — no cache
  getModules: (courseUnitId: string): Promise<CourseModule[]> => {
    return serverApiRequest<CourseModule[]>(`${API_CONFIG.ENDPOINTS.COURSE_MODULES}/${courseUnitId}`);
  },

  // Get module details (learn page) — no cache, video URLs and progress must be fresh
  getModuleDetails: (moduleId: string): Promise<ModuleDetailsResponse> => {
    return serverApiRequest<ModuleDetailsResponse>(
      `${API_CONFIG.ENDPOINTS.COURSE_MODULE_DETAILS}/${moduleId}/details`
    );
  },
};
