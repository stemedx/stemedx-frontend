import { apiRequest } from './client';
import { API_CONFIG } from '@/lib/constants/api';
import { VideoProgressRequest, VideoProgressResponse } from '@/lib/types/courses';

export const videoProgressApi = {
  getProgress: async (videoId: string): Promise<VideoProgressResponse> => {
    return apiRequest<VideoProgressResponse>(
      `${API_CONFIG.ENDPOINTS.VIDEO_PROGRESS}/${videoId}`
    );
  },

  saveProgress: async (data: VideoProgressRequest) => {
    return apiRequest(API_CONFIG.ENDPOINTS.VIDEO_PROGRESS, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
