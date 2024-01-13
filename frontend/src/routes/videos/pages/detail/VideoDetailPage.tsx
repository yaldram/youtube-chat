import { useOutletContext } from 'react-router-dom';

import { Video } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';

export function VideoDetailPage() {
  const videoDetails = useOutletContext<Video>();

  return (
    <ScrollArea className="w-full h-full mt-8 pb-9 pr-9">
      <div className="flex flex-col gap-6">
        <a href={videoDetails.url} target="_blank" rel="noopener noreferrer">
          <div
            style={{ height: '500px' }}
            className="cursor-pointer max-w-full overflow-hidden rounded-md"
          >
            <img
              src={videoDetails.thumbnailUrl}
              alt="Thumbnail"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </a>
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
