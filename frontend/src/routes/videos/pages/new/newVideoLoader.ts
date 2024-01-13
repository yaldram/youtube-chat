import { json, redirect } from 'react-router-dom';
import type { ActionFunctionArgs } from 'react-router-dom';
import { z } from 'zod';
import { parse } from '@conform-to/zod';

import { getYouTubeVideoId } from '@/lib/utils';
import { createVideo } from '@/apis/video';
import { handleLoaderErrors } from '@/lib/errors';

const schema = z.object({
  url: z.string({ required_error: 'Video url is required' }),
});

export function validateVideoForm({ formData }: { formData: FormData }) {
  return parse(formData, { schema });
}

export async function newVideoAction({ request, params }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const collectionId = params.collectionId;

    if (!collectionId) return redirect('/');

    const submission = parse(formData, { schema });

    if (!submission.value || submission.intent !== 'submit') {
      return json(submission, { status: 400 });
    }

    const youtubeId = getYouTubeVideoId(submission.value?.url);

    await createVideo({
      youtubeId,
      url: submission.value.url,
      collectionId,
    });

    return redirect(`/collections/${collectionId}/videos`);
  } catch (error) {
    return handleLoaderErrors(error);
  }
}
