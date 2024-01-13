import { json, redirect } from 'react-router-dom';
import type { ActionFunctionArgs } from 'react-router-dom';
import { parse } from '@conform-to/zod';
import { z } from 'zod';

import { APIError, handleLoaderErrors } from '@/lib/errors';
import { login } from '@/apis/user';

const schema = z.object({
  username: z.string({ required_error: 'Username is required.' }),
  password: z.string({ required_error: 'Password is required' }),
});

export function validateLoginForm({ formData }: { formData: FormData }) {
  return parse(formData, { schema });
}

export async function loginAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parse(formData, { schema });

  if (!submission.value || submission.intent !== 'submit') {
    return json(submission, { status: 400 });
  }

  try {
    await login(submission.value);

    return redirect('/');
  } catch (error) {
    if ((error as APIError).statusCode === 400) {
      return {
        ...submission,
        error: {
          ...submission.error,
          username: ['wrong credentials'],
          password: ['wrong credentials'],
        },
      };
    }

    handleLoaderErrors(error);
  }

  return null;
}
