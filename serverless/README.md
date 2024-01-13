# Youtube Chat Serverless

This project is a serverless application written in Python, bootstrapped using the AWS SAM (Serverless Application Model) CLI. The entire infrastructure is defined in the `template.yaml` file, offering a clear and concise representation of the serverless architecture.

![YouTube Chat State Machine](https://pub-2e209747425f40cdacae2d98eae729f3.r2.dev/youtube-chat-state-machine.png)

# App Working Overview

1.  **User Adds a Video:**

    - The user adds a video through the Nest.js endpoint.
    - The Nest.js endpoint saves the video information to the `Xata` database.
    - A custom event is added to AWS EventBridge using the AWS JavaScript SDK.

2.  **Event Triggering State Machine:**

    - The custom event triggers the YouTube State Machine defined in the SAM template.

3.  **State Machine Execution:**

    - The State Machine has three functions: `InfoFunction`, `TranscriptFunction`, and `EmbeddingFunction`.
    - `InfoFunction` and the other two functions run in parallel.

4.  **Parallel Execution:**

    - **InfoFunction:**

           - Fetches additional information about the video using the video ID.
           - Saves the fetched information.
           - After the Info Function completes its execution, it adds a Pusher event. This event is responsible for notifying the frontend in real-time.
           -  As a result, the frontend updates to display the enriched user information without requiring a manual refresh.

    - **TranscriptFunction:**

      - Downloads the transcript for the video.
      - Saves the transcript as a file to the `Xata` database.

    - **EmbeddingFunction:**
    - Downloads the transcript file from `Xata` database.
    - Creates embeddings for the video transcript using `Cohere` and saves the embeddings to `Xata` database.

5.  **Data Flow:**

    - The State Machine orchestrates the flow of data between the functions.
    - Video ID is included as payload in the event, providing necessary information to the serverless functions.

# Infrastructure Overview

This project leverages AWS SAM for a serverless architecture to fetch video information, transcripts, and create embeddings. Below are key components:

- **Infofunction** - Lambda function that fetches YouTube information for a specified video ID and stores it into `xata`. It also adds a Pusher event, responsible for notifying the frontend in real-time.

- **TranscriptFunction** - Lambda function responsible for fetching video transcripts, it stores the transcripts as a json file in `xata`.

- **EmbeddingFunction** - Lambda function to create embeddings for videos. It downlads the transcripts file from `xata` and created embedding using `cohere's` embedding endpoint.

- **YoutubeChatStateMachine** - AWS Step Functions state machine that integrates Info, Transcript, and Embedding functions.

- **YoutubeChatRule** - AWS EventBridge rule triggering the `YoutubeChatStateMachine` on specific events, using `custom.youtubeChat` as the event source.

- **EventBridgeRole** - IAM role allowing EventBridge to trigger the state machine.

For more detailed information and specific functionalities, refer to the `template.yaml` file in the `src` directory.

# Environment Variables

**Note:** The optimal way to manage secrets is using AWS Secret Manager, but due to it being a paid service, secrets are manually entered in the functions/configuration, which is discouraged.

| Variable      | Description                                       |
| ------------- | ------------------------------------------------- |
| PUSHER_APP_ID | Pusher application ID.                            |
| PUSHER_KEY    | Pusher API key.                                   |
| PUSHER_SECRET | Pusher API secret.                                |
| XATA_API_KEY  | API key for accessing the Xata service.           |
| XATA_DB_URL   | Database URL for connecting to the Xata database. |

## Build and Deploy

- `cd src`
- `pip install -r requirements.txt`
- `cd ..`
- `sam deploy --guided --capabilities CAPABILITY_IAM`

## Cleanup

To delete the sample application that you created, use the AWS CLI. Assuming you used your project name for the stack name, you can run the following:

```bash
sam delete --stack-name "youtube-chat"
```
