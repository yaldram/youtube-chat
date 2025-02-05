import os

from datetime import datetime, timezone

import isodate
import requests

from utils.xata import xata_utils
from utils.pusher import pusher_utils

def parse_duration_to_seconds(duration):
    """Parse ISO 8601 duration and return the total seconds as an integer."""
    try:
        parsed_duration = isodate.parse_duration(duration)
        return int(parsed_duration.total_seconds())  # Return total seconds as an integer
    except Exception as e:
        print(f"Error parsing duration: {e}")
        return 0

def get_youtube_info(youtube_id):
    """Fetch video details using YouTube Data API."""
    google_api_key = os.environ["GOOGLE_API_KEY"]

    url = f'https://www.googleapis.com/youtube/v3/videos?id={youtube_id}&key={google_api_key}&part=snippet,contentDetails,statistics'
    
    try:
        # Send request to YouTube Data API
        response = requests.get(url)
        video_info = response.json()

        # Check if the video exists in the response
        if 'items' not in video_info or len(video_info['items']) == 0:
            raise Exception("Video not found.")

        video = video_info['items'][0]

        # Extract relevant data
        return {
            "title": video['snippet']['title'],
            "description": video['snippet']['description'],
            "length": parse_duration_to_seconds(video['contentDetails']['duration']),
            "author": video['snippet']['channelTitle'],
            "thumbnailUrl": video['snippet']['thumbnails']['high']['url'],
            "publishDate": video['snippet']['publishedAt'],
        }

    except Exception as e:
        print(f"Error fetching video info: {e}")
        return None

def lambda_handler(event, context):
    print("Info event:", event)

    try:
        youtube_id = event["detail"]["youtubeId"]
        video_id = event["detail"]["id"]

        video_info = get_youtube_info(youtube_id)
        print("VIDEO INFO", video_info)
        
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
