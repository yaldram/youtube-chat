from datetime import datetime, timezone
import yt_dlp

from utils.xata import xata_utils
from utils.pusher import pusher_utils

def get_youtube_info(video_url):
    """Fetch video details using yt-dlp."""
    ydl_opts = {"quiet": True}  # Suppress unnecessary logs

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(video_url, download=False)
        
        return {
            "title": info.get("title", "Unknown Title"),
            "description": info.get("description", ""),
            "length": info.get("duration", 0),
            "author": info.get("uploader", "Unknown"),
            "thumbnailUrl": info.get("thumbnail", ""),
            "publishDate": datetime.utcfromtimestamp(info["timestamp"]).replace(tzinfo=timezone.utc).isoformat()
            if "timestamp" in info else None
        }

    except Exception as e:
        print(f"Error fetching video info: {e}")
        return None

def lambda_handler(event, context):
    print("Info event:", event)

    try:
        video_url = event["detail"]["url"]
        video_id = event["detail"]["id"]

        video_info = get_youtube_info(video_url)
        print(video_info)
        if not video_info:
            raise Exception("Failed to fetch video details.")

        # Update database record
        response = xata_utils.update_record("videos", video_id, video_info)
        if not response.is_success():
            raise Exception(f"Xata update failed: {response}")

        print("Updated Video Information Successfully")

        # Push event update
        video_info["id"] = video_id
        pusher_utils.push("video-details", video_info)
        print("Pushed update on video-details")

    except Exception as error:
        print("An error occurred:", error)
        return None
