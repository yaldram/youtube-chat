from utils.cohere import cohere_utils
from utils.xata import xata_utils

def lambda_handler(event, context):
  print("Embedding event: " + str(event))

  try: 
    video_id = event["videoId"]

    transcripts = xata_utils.read_transcript(record_id=video_id)

    counter = 0
    batch_size = 10

    while counter < len(transcripts):
      records = []
      # Take 10 elements at a time
      batch = transcripts[counter : counter + batch_size]

      documents = [element['text'] for element in batch]

      embeddings = cohere_utils.create_embeddings(documents)

      # Create records of 10 elements at a time
      for index, doc in enumerate(batch):
        records.append({
            'text': doc["text"],
            'embedding': embeddings[index],
            'videoId': video_id,
            'start': doc['start']
        })
      
      # Ingest 10 documents at a time
      response = xata_utils.bulk_insert("embeddings", records)

      if not response.is_success():
        raise Exception(response)

      counter += batch_size

    print("Created embeddings for the transcript.")

    # update the video record chat is enabled
    xata_utils.update_record("videos", video_id, { "chatEnabled": True })

    print("Updated video record, chat enabled")
  
  except Exception as error:
    print("An error occurred: ", error)