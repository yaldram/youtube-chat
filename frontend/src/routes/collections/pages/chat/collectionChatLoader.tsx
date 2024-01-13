import { json, redirect, type LoaderFunctionArgs } from 'react-router-dom';

import { fetchCollectionVideoIds } from '@/apis/collection';
import { handleLoaderErrors } from '@/lib/errors';

export async function collectionChatLoader({ params }: LoaderFunctionArgs) {
  try {
    const collectionId = params.collectionId;

    if (!collectionId) return redirect('/');

    const videoIds = await fetchCollectionVideoIds(collectionId);

    return json({ videoIds });
  } catch (error) {
    return handleLoaderErrors(error);
  }
}
