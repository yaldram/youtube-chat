import { Form, Link, NavLink, useFetcher } from 'react-router-dom';
import { useState } from 'react';
import type { ChangeEvent } from 'react';

import { Collection, User } from '@/types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

type SideMenuProps = {
  collections: Collection[];
  user: User;
};

export function SideMenu({ collections, user }: SideMenuProps) {
  const fetcher = useFetcher();
  const [search, setSearch] = useState('');

  const collectionData = fetcher.data?.collections
    ? (fetcher.data?.collections as Collection[])
    : collections;

  const onSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      // reset the search when the user clears the input
      fetcher.submit(event.currentTarget.form, {
        method: 'GET',
      });
    }

    setSearch(event.target.value);
  };

  return (
    <div className="flex justify-between h-full flex-col border-e w-1/4">
      {/* Collection Input and Add Button */}
      <div className="mt-6">
        <fetcher.Form className="my-6 px-4">
          <Input
            value={search}
            onChange={onSearchInputChange}
            id="collection"
            type="text"
            name="search"
            placeholder="Enter Collection Name"
          />
        </fetcher.Form>

        {/* Sticky bar separator */}
        <div className="sticky inset-x-0 top-0 border-t bg-red"></div>

        {/* List of collections */}
        <div className="px-4 pb-4">
          <ul className="mt-6 space-y-3">
            {collectionData.map((collection) => (
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
      <div className="flex flex-col gap-4 sticky inset-x-0 bottom-0">
        <div className="px-4">
          <Button asChild className="w-full">
            <Link to="/collections/new">Add new collection</Link>
          </Button>
        </div>
        <div className="flex justify-between items-center gap-2 p-4 border-t">
          <p className="text-xs">
            {/* User details */}
            <strong className="block font-medium">{user.username}</strong>
            <span>{user.name}</span>
          </p>
          {/* Logout button */}
          <Form method="POST">
            <Button type="submit" size="sm">
              Logout
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
