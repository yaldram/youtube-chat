import {
  Form,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { BadgeXIcon, SearchIcon } from 'lucide-react';

import { TabsLayout } from '../../layout/TabsLayout';
import { Video } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { VideoCard } from '@/components/templates/VideoCard';

export function DashboardHomePage() {
  const videos = useLoaderData() as Video[];
  const navigate = useNavigate();

  const [params] = useSearchParams();
  const searchParams = params.get('search') || '';
  const [search, setSearch] = useState(searchParams);

  useEffect(() => {
    // reset the search params on clear
    setSearch(searchParams);
  }, [searchParams]);

  const clearInput = () => {
    if (searchParams) return navigate('.');

    setSearch('');
  };

  return (
    <TabsLayout>
      <Form>
        <div className="flex items-end pt-6 pb-0 gap-6">
          <Input
            name="search"
            id="search"
            placeholder="Search for videos."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <fieldset className="flex gap-6" disabled={!search}>
            <Button type="submit">
              <SearchIcon className="mr-2 h-4 w-4" /> Search
            </Button>
            <Button variant="secondary" type="button" onClick={clearInput}>
              <BadgeXIcon className="mr-2 h-4 w-4" /> Clear
            </Button>
          </fieldset>
        </div>
      </Form>

      <ScrollArea className="h-full pt-4">
        <div className="my-10 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pr-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </ScrollArea>
    </TabsLayout>
  );
}
