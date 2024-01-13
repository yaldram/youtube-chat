import { Link, NavLink } from 'react-router-dom';
import { PlusIcon } from 'lucide-react';

import { Collection, User } from '@/types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

type SideMenuProps = {
  collections: Collection[];
  user: User;
};

export function SideMenu({ collections, user }: SideMenuProps) {
  return (
    <div className="flex justify-between h-full flex-col border-e w-1/4">
      {/* Collection Input and Add Button */}
      <div className="mt-6">
        <div className="flex gap-4 mb-6 px-4 mt-6">
          <Input
            id="collection"
            type="text"
            placeholder="Enter Collection Name"
          />
          {/* Button for adding new collection */}
          <Button className="self-end" size="sm" variant="outline">
            <Link to="/collections/new">
              <PlusIcon className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Sticky bar separator */}
        <div className="sticky inset-x-0 top-0 border-t bg-red"></div>

        {/* List of collections */}
        <div className="px-4 pb-4">
          <ul className="mt-6 space-y-3">
            {collections.map((collection) => (
              <li key={collection.id}>
                {/* Navigation links for collections */}
                <NavLink
                  to={`/collections/${collection.id}/videos`}
                  className={({ isActive }) =>
                    `block rounded-lg p-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${
                      isActive
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-background'
                    }`
                  }
                >
                  {collection.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom section - User details and Logout button */}
      <div className="sticky inset-x-0 bottom-0 border-t">
        <div className="flex justify-between items-center gap-2 p-4">
          <p className="text-xs">
            {/* User details */}
            <strong className="block font-medium">{user.username}</strong>
            <span>{user.name}</span>
          </p>
          {/* Logout button */}
          {/* <Form method="POST">
            <Button type="submit" size="sm">
              Logout
            </Button>
          </Form> */}
        </div>
      </div>
    </div>
  );
}
