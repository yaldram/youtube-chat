import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { YOUTUBE_REGEX } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getYouTubeVideoId(url: string) {
  // Extract video ID using RegExp
  const match = url.match(YOUTUBE_REGEX);

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
