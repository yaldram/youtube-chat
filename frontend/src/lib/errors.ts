import { redirect } from 'react-router-dom';

export class APIError extends Error {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

export async function handleErrorResponse(
  response: Response,
): Promise<APIError> {
  const errorData = await response.json();
  const errorMessage = errorData.message || 'Unknown error occurred';
  return new APIError(response.status, errorMessage);
}

export function handleSuccessResponse<T>(response: Response): Promise<T> {
  return response.json();
}

export function handleLoaderErrors(error: unknown) {
  if (error instanceof APIError) {
    if (error.statusCode === 401) {
      return redirect('/login');
    } else if (error.statusCode === 400) {
      return redirect('/login');
    } else {
      console.log('An error occrred with statuscode', error.statusCode);
    }
  } else {
    console.log('An error occurred', error);
  }
}
