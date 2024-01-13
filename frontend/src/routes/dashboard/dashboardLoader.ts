import { json } from 'react-router-dom';

import { fetchCollections } from '@/apis/collection';
import { authenticate } from '@/apis/user';
import { handleLoaderErrors } from '@/lib/errors';

export async function dashboardLoader() {
  try {
    const [user, collections] = await Promise.all([
      authenticate(),
      fetchCollections(),
    ]);

    return json({ collections, user });
  } catch (error) {
    return handleLoaderErrors(error);
  }
}
