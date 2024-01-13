import { json, redirect } from 'react-router-dom';
import type { ActionFunctionArgs } from 'react-router-dom';
import { z } from 'zod';
import { parse } from '@conform-to/zod';

import { createCollection } from '@/apis/collection';
import { handleLoaderErrors } from '@/lib/errors';

const schema = z.object({
  title: z.string({ required_error: 'collection name is required.' }),
});

export function validateCollectionForm({ formData }: { formData: FormData }) {
  return parse(formData, { schema });
}

export async function newCollectioAction({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const submission = parse(formData, { schema });

    if (!submission.value || submission.intent !== 'submit') {
      return json(submission, { status: 400 });
    }

    const newCollection = await createCollection(submission.value);

    return redirect(`/collections/${newCollection.id}/videos`);
  } catch (error) {
    return handleLoaderErrors(error);
  }
}
