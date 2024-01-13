export type Collection = {
  id: string;
  title: string;
};

export type Video = {
  id: string;
  url: string;
  youtubeId: string;
  chatEnabled: boolean;
  title?: string;
  author?: string;
  description?: string;
  thumbnailUrl?: string;
};

export type CreateVideoPayload = {
  collectionId: string;
  url: string;
  youtubeId: string;
};

export type User = {
  id: string;
  username: string;
  name: string;
};

export type UserLoginPayload = {
  username: string;
  password: string;
};

// Types for Theme and ColorSchemes
export type Theme = 'dark' | 'light' | 'system';
export type ColorScheme = 'zinc' | 'rose' | 'blue' | 'green' | 'orange';

export type SubmissionResult = {
  intent: string;
  payload: Record<string, unknown> | null;
  error: Record<string, string[]>;
};

export type TabRoutes = {
  to: string;
  label: string;
  end?: boolean;
};

export type ChatMessage = { role: 'user' | 'assistant'; content: string };
