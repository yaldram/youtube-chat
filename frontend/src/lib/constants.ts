import { ColorScheme, Theme } from '@/types';

export const COLOR_SCHEMS: ColorScheme[] = [
  'zinc',
  'rose',
  'blue',
  'green',
  'orange',
];

export const THEMES: Theme[] = ['light', 'dark', 'system'];

export const DEFAULT_VIDEO = {
  title: 'Processing Video',
  thumbnail:
    'https://cdn.pixabay.com/photo/2023/03/16/16/49/watercolor-7857103_640.png',
};

export const YOUTUBE_REGEX =
  /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
