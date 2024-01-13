import math
import json

from youtube_transcript_api import YouTubeTranscriptApi

from utils.xata import xata_utils

def lambda_handler(event, context):
  print("Transcript event: " + str(event))

  try:
      youtube_id = event["detail"]["youtubeId"]
      video_id = event["detail"]["id"]

      transcript = YouTubeTranscriptApi.get_transcript(youtube_id)

      chunk_size = 2000
      chunks = []
      current_chunk = ""
      start_time = 0

      for part in transcript:
          text = part['text']
          
          if len(current_chunk) + len(text) <= chunk_size:
              current_chunk += text + ' '
          else:
              chunks.append({
                  "text": current_chunk.strip(),
                  "start": math.floor(start_time)
              })
              current_chunk = text + ' '
              start_time = part['start']

      chunks.append({
          "text": current_chunk.strip(),
          "start": math.floor(start_time)
      })

      # Convert chunks to JSON
      json_data = json.dumps(chunks)
      # Convert JSON data to bytes
      json_bytes = json_data.encode('utf-8')

      response = xata_utils.upload_transcript(record_id=video_id, data=json_bytes)

      if not response.is_success():
        raise Exception(response)
      
      print("Transcript saved successfully to S3, updated record.")

      video_details = {
         "videoId": video_id
      }

      return video_details
  
  except Exception as e:
      print('An error occurred:', e)
      return None