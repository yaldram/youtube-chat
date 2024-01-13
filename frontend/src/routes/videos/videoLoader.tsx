import { LoaderFunctionArgs, redirect, json } from 'react-router-dom';

import { fetchVideoDetails } from '@/apis/video';
import { handleLoaderErrors } from '@/lib/errors';

export async function videoLoader({ params }: LoaderFunctionArgs) {
  try {
    const videoId = params.videoId;

    if (!videoId) return redirect('/');

    const videoDetails = await fetchVideoDetails(videoId);

    return json({ videoDetails });
  } catch (error) {
    return handleLoaderErrors(error);
  }
}
