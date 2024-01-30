import type { ReactNode } from 'react';

import { TabRoutes } from '@/types';
import { TabsNavigation } from '@/components/templates/TabsNavigation';

type TabsLayoutProps = {
  children?: ReactNode;
};

const dashboardRoutes: TabRoutes[] = [
  {
    to: '/',
    label: 'Home',
  },
  {
    to: '/chat',
    label: 'Chat',
  },
];

export function TabsLayout({ children }: TabsLayoutProps) {
  return (
    <div className="w-full p-10 pb-0 flex flex-col gap-4 h-full">
      <TabsNavigation routes={dashboardRoutes} />

      <div className="w-full h-[90%]">{children}</div>
    </div>
  );
}
