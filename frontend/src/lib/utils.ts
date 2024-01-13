import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getYouTubeVideoId(url: string) {
  // Regular expression to match YouTube URL patterns
  const regExp =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;

  // Extract video ID using RegExp
  const match = url.match(regExp);

  if (match && match[1]) {
    return match[1]; // Return the video ID
  } else {
    return ''; // If no match found
  }
}

export function getUniqueId(conversationId: string) {
  const randomString = Math.random().toString(36).substring(2, 7);
  return `${conversationId}-${randomString}`;
}
