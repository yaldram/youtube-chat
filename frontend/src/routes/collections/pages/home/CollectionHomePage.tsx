import { useEffect, useState } from 'react';
import { BadgeXIcon, PlusIcon, SearchIcon } from 'lucide-react';
import {
  Form,
  Link,
  Outlet,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Video } from '@/types';
import { VideoCard } from '@/components/templates/VideoCard';
import { youtubeChatChannel } from '@/lib/pusher';
import { Input } from '@/components/ui/input';

type LoaderData = { videos: Video[] };

export function CollectionHomePage() {
  const { videos } = useLoaderData() as LoaderData;
  const [videoData, setVideoData] = useState<Video[]>(videos);
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

  useEffect(() => {
    setVideoData(videos);
  }, [videos]);

  useEffect(() => {
    youtubeChatChannel.bind('video-details', (data: Video) => {
      if (!data) return;

      setVideoData((videos) =>
        videos.map((video) =>
          video.id === data.id ? { ...video, ...data } : video,
        ),
      );
    });
  }, []);

  return (
    <>
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

      <ScrollArea className="h-[90%] pt-4">
        <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pr-6">
          {videoData.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </ScrollArea>

      <div className="fixed bottom-8 right-8">
        <Button className="rounded-full" size="icon">
          <Link to="new">
            <PlusIcon className="h-6 w-6" />
          </Link>
        </Button>
      </div>

      <Outlet />
    </>
  );
}
