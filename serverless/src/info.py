from datetime import timezone

from pytube import YouTube

from utils.xata import xata_utils
from utils.pusher import pusher_utils

def lambda_handler(event, context):
  print("Info event: " + str(event))

  try:
      video_url = event["detail"]["url"]
      video_id = event["detail"]["id"]

      youtube_info = YouTube(video_url)

      # return the first object in the stream to populate description
      youtube_info.streams.first()

      # Extract video information
      video_info = {
        "title": youtube_info.title,
        "description": youtube_info.description,
        "length": youtube_info.length,
        "author": youtube_info.author,
        "thumbnailUrl": youtube_info.thumbnail_url,
         # Convert datetime object to string in RFC 3339 format
        "publishDate": youtube_info.publish_date.replace(tzinfo=timezone.utc).isoformat()
      }

      response = xata_utils.update_record("videos", video_id, video_info)

      if not response.is_success():
        raise Exception(response)

      print("Updated Video Information Successfully")

      # pusher push for video details added
      video_info["id"] = video_id
      pusher_utils.push("video-details", video_info)

      print("Pushed update on video-details")

  except Exception as error:
    print('An error occurred:', error)
    return None