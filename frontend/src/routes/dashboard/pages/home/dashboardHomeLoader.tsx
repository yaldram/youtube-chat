import { json, type LoaderFunctionArgs } from 'react-router-dom';

import { searchAllVideos } from '@/apis/video';
import { handleLoaderErrors } from '@/lib/errors';

export async function dashboardHomeLoader({ request }: LoaderFunctionArgs) {
  try {
    const userQuery = new URL(request.url).searchParams.get('search');

    if (!userQuery) return json([]);

    const videos = await searchAllVideos(userQuery);

    return json(videos);
  } catch (error) {
    return handleLoaderErrors(error);
  }
}
