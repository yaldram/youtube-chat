import { json, redirect, type LoaderFunctionArgs } from 'react-router-dom';

import { fetchCollectionVideos } from '@/apis/collection';
import { handleLoaderErrors } from '@/lib/errors';

export async function collectionHomeLoader({ params }: LoaderFunctionArgs) {
  try {
    const collectionId = params.collectionId;

    if (!collectionId) return redirect('/');

    const videos = await fetchCollectionVideos(collectionId);

    return json({ videos });
  } catch (error) {
    return handleLoaderErrors(error);
  }
}
