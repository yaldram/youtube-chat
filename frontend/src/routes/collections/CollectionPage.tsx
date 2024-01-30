import { Outlet } from 'react-router-dom';

import { TabRoutes } from '@/types';
import { TabsNavigation } from '@/components/templates/TabsNavigation';

const collectionTabRoutes: TabRoutes[] = [
  {
    to: 'videos',
    label: 'Videos',
    end: true,
  },
  {
    to: 'videos/chat',
    label: 'Chat',
  },
];

export function CollectionPage() {
  return (
    <div className="w-full p-9 pb-0 flex flex-col gap-4 h-full">
      <div className="pl-1">
        <TabsNavigation routes={collectionTabRoutes} />
      </div>

      <div className="w-full pl-1 h-full overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
