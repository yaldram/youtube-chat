import { Outlet, useLoaderData } from 'react-router-dom';

import { Navbar } from '@/components/templates/Navbar';
import { SideMenu } from '@/components/templates/Sidemenu';
import { Collection, User } from '@/types';

type LoaderData = { collections: Collection[]; user: User };

export function DashboardPage() {
  const { collections, user } = useLoaderData() as LoaderData;

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-10">
        <Navbar />
      </div>

      <div className="flex h-full overflow-hidden">
        <SideMenu collections={collections} user={user} />

        <div className="h-full w-full">
          <Outlet context={user} />
        </div>
      </div>
    </div>
  );
}
