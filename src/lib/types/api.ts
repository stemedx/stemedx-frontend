// Common API Types

// API Response wrapper
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Shared types
export interface Subject {
  id: string;
  name: string;
  code: string;
}