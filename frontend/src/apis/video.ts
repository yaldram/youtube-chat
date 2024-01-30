import { apiEndpoints } from '@/lib/apiConfig';
import { handleErrorResponse, handleSuccessResponse } from '@/lib/errors';
import { CreateVideoPayload, Video } from '@/types';

export async function createVideo(newVideo: CreateVideoPayload) {
  const response = await fetch(apiEndpoints.videos, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(newVideo),
  });

  if (!response.ok) throw await handleErrorResponse(response);

  return handleSuccessResponse<Video>(response);
}

export async function fetchVideoDetails(videoId: string) {
  const response = await fetch(apiEndpoints.videoDetails(videoId), {
    credentials: 'include',
  });

  if (!response.ok) throw await handleErrorResponse(response);

  return handleSuccessResponse<Video>(response);
}

export async function searchCollectionVideos(
  collectionId: string,
  userQuery: string,
) {
  const response = await fetch(
    apiEndpoints.searchCollectionVideos(collectionId, userQuery),
    {
      credentials: 'include',
    },
  );

  if (!response.ok) throw await handleErrorResponse(response);

  return handleSuccessResponse<Video[]>(response);
}

export async function searchAllVideos(userQuery: string) {
  const response = await fetch(apiEndpoints.searchAllVideos(userQuery), {
    credentials: 'include',
  });

  if (!response.ok) throw await handleErrorResponse(response);

  return handleSuccessResponse<Video[]>(response);
}
