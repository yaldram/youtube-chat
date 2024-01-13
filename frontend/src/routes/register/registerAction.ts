import { json, redirect } from 'react-router-dom';
import type { ActionFunctionArgs } from 'react-router-dom';
import { parse } from '@conform-to/zod';
import { z } from 'zod';

import { APIError, handleLoaderErrors } from '@/lib/errors';
import { register } from '@/apis/user';

const schema = z.object({
  name: z.string({ required_error: 'Name is required.' }),
  username: z.string({ required_error: 'Username is required' }),
  password: z.string({ required_error: 'Password is required' }),
});

export function validateRegisterForm({ formData }: { formData: FormData }) {
  return parse(formData, { schema });
}

export async function registerAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parse(formData, { schema });

  if (!submission.value || submission.intent !== 'submit') {
    return json(submission, { status: 400 });
  }

  try {
    await register(submission.value);

    return redirect('/login');
  } catch (error) {
    if ((error as APIError).statusCode === 409) {
      return {
        ...submission,
        error: {
          ...submission.error,
          username: ['please use a different username'],
        },
      };
    }

    handleLoaderErrors(error);
  }

  return null;
}
