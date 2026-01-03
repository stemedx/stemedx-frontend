import { API_CONFIG } from '@/lib/constants/api';
import { Instructor } from '@/lib/types/instructors';
import { apiRequest } from './client';

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
