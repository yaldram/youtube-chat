import { NavLink } from 'react-router-dom';

import { TabRoutes } from '@/types';
import { Tabs, TabsList } from '../ui/tabs';

export type TabsNavigationProps = {
  routes: TabRoutes[];
};

export function TabsNavigation({ routes }: TabsNavigationProps) {
  return (
    <Tabs className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        {routes.map((route, index) => (
          <NavLink
            key={index}
            to={route.to}
            end={route.end}
            className={({ isActive }) =>
              `inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                isActive ? 'bg-background text-foreground shadow-sm' : ''
              }`
            }
          >
            {route.label}
          </NavLink>
        ))}
      </TabsList>
    </Tabs>
  );
}
