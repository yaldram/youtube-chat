import { Outlet, useLoaderData } from 'react-router-dom';

import { TabRoutes, Video } from '@/types';
import { TabsNavigation } from '@/components/templates/TabsNavigation';

type LoaderData = { videoDetails: Video };

const videoTabRoutes: TabRoutes[] = [
  {
    to: 'details',
    label: 'Details',
  },
  {
    to: 'chat',
    label: 'Chat',
  },
];

export function VideoPage() {
  const { videoDetails } = useLoaderData() as LoaderData;

  return (
    <div className="w-full p-9 pb-0 flex flex-col gap-4 h-full">
      <TabsNavigation routes={videoTabRoutes} />

      <div className="w-full h-full pb-4 overflow-hidden">
        <Outlet context={videoDetails} />
      </div>
    </div>
  );
}
