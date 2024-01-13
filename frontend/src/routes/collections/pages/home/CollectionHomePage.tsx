import { useEffect, useState } from 'react';
import { Link, Outlet, useLoaderData } from 'react-router-dom';
import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Video } from '@/types';
import { VideoCard } from '@/components/templates/VideoCard';
import { youtubeChatChannel } from '@/lib/pusher';

type LoaderData = { videos: Video[] };

export function CollectionHomePage() {
  const { videos } = useLoaderData() as LoaderData;
  const [videoData, setVideoData] = useState<Video[]>(videos);

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
      <ScrollArea className="h-full">
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
