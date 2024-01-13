import { useNavigate } from 'react-router-dom';

import { Video } from '@/types';
import { DEFAULT_VIDEO } from '@/lib/constants';
import { Card, CardContent, CardFooter, CardTitle } from '../ui/card';

type VideoCardProps = {
  video: Video;
};

export function VideoCard({ video }: VideoCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!video.title) return;

    // Navigate to the details page of the video
    navigate(`${video.id}/details`);
  };

  // Define title and thumbnail with fallback values if missing
  const title = video.title || DEFAULT_VIDEO['title'];
  const thumbnail = video.thumbnailUrl || DEFAULT_VIDEO['thumbnail'];

  // Determine the class name for the card based on video availability
  const cardClassName = `cursor-pointer max-w-md w-full ${
    video.title ? '' : 'cursor-not-allowed'
  }`;

  return (
    <Card key={video.id} onClick={handleClick} className={cardClassName}>
      <CardContent className="h-78">
        <img src={thumbnail} alt="Card Image" className="w-full h-full" />
      </CardContent>

      <CardFooter>
        <CardTitle>{title}</CardTitle>
      </CardFooter>
    </Card>
  );
}
