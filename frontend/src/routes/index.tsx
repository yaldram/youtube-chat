import { createBrowserRouter } from 'react-router-dom';

import { RegisterPage } from './register/RegisterPage';
import { registerAction } from './register/registerAction';
import { LoginPage } from './login/LoginPage';
import { loginAction } from './login/loginAction';
import { DashboardPage } from './dashboard/DashboardPage';
import { dashboardLoader } from './dashboard/dashboardLoader';
import { DashboardHomePage } from './dashboard/pages/home/DashboardHomePage';
import { DashboardChatPage } from './dashboard/pages/chat/DashboardChatPage';
import { dashboardAction } from './dashboard/dashboardAction';
import { CollectionPage } from './collections/CollectionPage';
import { CollectionHomePage } from './collections/pages/home/CollectionHomePage';
import { collectionHomeLoader } from './collections/pages/home/collectionHomeLoader';
import { CollectionChatPage } from './collections/pages/chat/CollectionChatPage';
import { collectionChatLoader } from './collections/pages/chat/collectionChatLoader';
import { VideoChatPage } from './videos/pages/chat/VideoChatPage';
import { VideoDetailPage } from './videos/pages/detail/VideoDetailPage';
import { VideoPage } from './videos/VideoPage';
import { videoLoader } from './videos/videoLoader';
import { NewCollectionPage } from './collections/pages/new/NewCollectionPage';
import { newCollectioAction } from './collections/pages/new/newCollectionAction';
import { NewVideoPage } from './videos/pages/new/NewVideoPage';
import { newVideoAction } from './videos/pages/new/newVideoAction';
import { dashboardHomeLoader } from './dashboard/pages/home/dashboardHomeLoader';

export const appRouter = createBrowserRouter([
  {
    path: '/register',
    element: <RegisterPage />,
    action: registerAction,
  },
  {
    path: '/login',
    element: <LoginPage />,
    action: loginAction,
  },
  {
    path: '/',
    element: <DashboardPage />,
    action: dashboardAction,
    loader: dashboardLoader,
    shouldRevalidate: ({ currentUrl }) => {
      // only re-validate when a new collection is added.
      return currentUrl.pathname === '/collections/new';
    },
    children: [
      {
        index: true,
        loader: dashboardHomeLoader,
        element: <DashboardHomePage />,
      },
      {
        path: 'chat',
        element: <DashboardChatPage />,
      },
      {
        path: '/collections/new',
        element: <NewCollectionPage />,
        action: newCollectioAction,
      },

      {
        path: '/collections/:collectionId',
        element: <CollectionPage />,
        children: [
          {
            path: 'videos/chat',
            loader: collectionChatLoader,
            element: <CollectionChatPage />,
          },
          {
            path: 'videos',
            element: <CollectionHomePage />,
            loader: collectionHomeLoader,
            children: [
              {
                path: 'new',
                element: <NewVideoPage />,
                action: newVideoAction,
              },
            ],
          },
        ],
      },
      {
        path: '/collections/:collectionId/videos/:videoId',
        element: <VideoPage />,
        loader: videoLoader,
        children: [
          {
            index: true,
            path: 'details',
            element: <VideoDetailPage />,
          },
          {
            path: 'chat',
            element: <VideoChatPage />,
          },
        ],
      },
    ],
  },
]);
