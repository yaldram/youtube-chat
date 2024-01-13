import { redirect } from 'react-router-dom';

import { logout } from '@/apis/user';
import { handleLoaderErrors } from '@/lib/errors';

export async function dashboardAction() {
  try {
    await logout();

    return redirect('/login');
  } catch (error) {
    return handleLoaderErrors(error);
  }
}
