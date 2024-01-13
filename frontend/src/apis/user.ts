import { apiEndpoints } from '@/lib/apiConfig';
import { handleErrorResponse, handleSuccessResponse } from '@/lib/errors';
import { User, UserLoginPayload } from '@/types';

export async function register(user: Omit<User, 'id'>) {
  const response = await fetch(apiEndpoints.register, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) throw await handleErrorResponse(response);

  return handleSuccessResponse<User>(response);
}

export async function login(user: UserLoginPayload) {
  const response = await fetch(apiEndpoints.login, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(user),
  });

  if (!response.ok) throw await handleErrorResponse(response);

  return handleSuccessResponse<User>(response);
}

export async function logout() {
  const response = await fetch(apiEndpoints.logout, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) throw await handleErrorResponse(response);

  return;
}

export async function authenticate() {
  const response = await fetch(apiEndpoints.authenticate, {
    credentials: 'include',
  });

  if (!response.ok) throw await handleErrorResponse(response);

  return handleSuccessResponse<User>(response);
}
