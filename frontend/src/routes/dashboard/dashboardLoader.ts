import { LoaderFunctionArgs, json } from 'react-router-dom';

import { fetchCollections, searchCollections } from '@/apis/collection';
import { authenticate } from '@/apis/user';
import { handleLoaderErrors } from '@/lib/errors';

export async function dashboardLoader({ request }: LoaderFunctionArgs) {
  try {
    const userQuery = new URL(request.url).searchParams.get('search');
    console.log('USerquery', userQuery);
    if (!userQuery) {
      const [user, collections] = await Promise.all([
        authenticate(),
        fetchCollections(),
      ]);

      return json({ collections, user });
    }

    const collections = await searchCollections(userQuery);
    console.log('Collections', collections);
    return json({ collections });
  } catch (error) {
    return handleLoaderErrors(error);
  }
}
