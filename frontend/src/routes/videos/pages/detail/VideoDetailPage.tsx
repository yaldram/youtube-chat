import { useOutletContext } from 'react-router-dom';

import { Video } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';

export function VideoDetailPage() {
  const videoDetails = useOutletContext<Video>();

  return (
    <ScrollArea className="w-full h-full mt-8 pb-9 pr-9">
      <div className="flex flex-col gap-6">
        <div
          style={{ height: '500px' }}
          className="max-w-full overflow-hidden rounded-md"
        >
          <a href={videoDetails.url} target="_blank" rel="noopener noreferrer">
            <img
              src={videoDetails.thumbnailUrl}
              alt="Thumbnail"
              className="w-full h-full object-cover object-center"
            />
          </a>
        </div>
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-5xl font-bold leading-tight tracking-tighter">
            {videoDetails.title}
          </h1>
          <h3 className="text-xl leading-tight tracking-tighter">
            By {videoDetails.author}
          </h3>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
        </div>

        <div className="text-xl leading-tight tracking-tighter">
          {videoDetails.description}
        </div>
      </div>
    </ScrollArea>
  );
}
