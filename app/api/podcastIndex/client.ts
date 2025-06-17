import { GenerateAuthHeaders } from './auth';
import type { PodcastSearchParams } from './types';

const API_BASE = 'https://api.podcastindex.org/api/1.0';

const headers = await GenerateAuthHeaders(
  import.meta.env.VITE_API_KEY,
  import.meta.env.VITE_API_SECRET
);

export const searchPodcasts = async (params: PodcastSearchParams) => {
  const response = await fetch(`${API_BASE}/search/byterm?${new URLSearchParams(params)}`, { 
    headers 
  });
  // const response = await fetch(`${API_BASE}/search/byterm?${new URLSearchParams(params as unknown as Record<string, string>)}`, {
  //   headers
  // });
  return response.json();
};

export const searchTrending = async (params: PodcastSearchParams) => {
  const response = await fetch(`${API_BASE}/podcasts/trending`, { 
    headers 
  });
  return response.json();
};
