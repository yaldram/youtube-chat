import { apiEndpoints } from '@/lib/apiConfig';
import { handleErrorResponse, handleSuccessResponse } from '@/lib/errors';
import type { Collection, Video } from '@/types';

export async function fetchCollections() {
  const response = await fetch(apiEndpoints.collections, {
    credentials: 'include',
  });

  if (!response.ok) throw await handleErrorResponse(response);

  return handleSuccessResponse<Collection[]>(response);
}

export async function createCollection(newCollection: Omit<Collection, 'id'>) {
  const response = await fetch(apiEndpoints.collections, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(newCollection),
  });

  if (!response.ok) throw await handleErrorResponse(response);

  return handleSuccessResponse<Collection>(response);
}

export async function fetchCollectionVideos(collectionId: string) {
  const response = await fetch(apiEndpoints.collectionVideos(collectionId), {
    credentials: 'include',
  });

  if (!response.ok) throw await handleErrorResponse(response);

  return handleSuccessResponse<Video[]>(response);
}

export async function fetchCollectionVideoIds(collectionId: string) {
  const response = await fetch(apiEndpoints.collectionVideoIds(collectionId), {
    credentials: 'include',
  });

  if (!response.ok) throw await handleErrorResponse(response);

  return handleSuccessResponse<string[]>(response);
}
