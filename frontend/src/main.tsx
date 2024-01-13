import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { ThemeProvider } from './contexts/ThemeContext';
import { appRouter } from './routes';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" defaultColorScheme="zinc">
      <RouterProvider router={appRouter} />
    </ThemeProvider>
  </React.StrictMode>,
);
