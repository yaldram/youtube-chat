import { json, redirect, type LoaderFunctionArgs } from 'react-router-dom';

import { fetchCollectionVideos } from '@/apis/collection';
import { handleLoaderErrors } from '@/lib/errors';
import { searchCollectionVideos } from '@/apis/video';

export async function collectionHomeLoader({
  request,
  params,
}: LoaderFunctionArgs) {
  try {
    const collectionId = params.collectionId;

    if (!collectionId) return redirect('/');

    const userQuery = new URL(request.url).searchParams.get('search');

    if (!userQuery) {
      const videos = await fetchCollectionVideos(collectionId);

      return json({ videos });
    }

    const videos = await searchCollectionVideos(collectionId, userQuery);

    return json({ videos });
  } catch (error) {
    return handleLoaderErrors(error);
  }
}
