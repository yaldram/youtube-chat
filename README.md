# Youtube Chat

Youtube Chat is a chat application that allows you to interact with your Youtube videos using a chatbot. This application is built to enhance your Youtube experience by facilitating conversations with your video content. Utilizing the RAG framework, the chatbot is driven by Cohere LLMs, providing an intelligent interaction with your youtube knowledge base.

<!-- HTML code for side-by-side images -->
<div style="display: flex; padding: 20px; gap: 20px; flex-wrap: wrap">
    <img src="https://pub-2e209747425f40cdacae2d98eae729f3.r2.dev/youtube-chat-login.png" alt="Login" width="45%"/>
    <img src="https://pub-2e209747425f40cdacae2d98eae729f3.r2.dev/youtube-chat-collection.png" alt="Collections" width="45%"/>
    <img src="https://pub-2e209747425f40cdacae2d98eae729f3.r2.dev/youtube-chat-theme.png" alt="Chat Bot" width="45%"/>
    <img src="https://pub-2e209747425f40cdacae2d98eae729f3.r2.dev/youtube-chat-dark.png" alt="Chat Bot Theme" width="45%"/>
</div>

## Features

- **Authentication:** Securely log in and register.

- **Create Collections:** Similar to YouTube playlists, organize your videos into collections for better management and categorization.

- **Add YouTube Videos:** Easily add YouTube videos to your collections using the video URL.

- **Automatic Transcript Download:** When adding a video, the app automatically downloads the transcript in the background.

- **Embeddings with Cohere LLM:** Utilizing the Cohere LLM (Large Language Model), the app creates embeddings for the video transcripts.

- **Chat with Your Video:** Engage in conversations with individual videos. Ask questions or discuss the content directly.

- **Chat with Collection:** Interact with all the videos within a specific collection.

- **Knowledge Base Chat:** Finally chat with all collections, all the videos across all the collections.

## Project Overview

- **Backend** - Houses the `Node.js` backend, written in `TypeScript` and built with the `Nest.js` framework. Leveraging TypeScript ensures a robust and statically typed codebase, while Nest.js facilitates the creation of REST APIs.

- **Frontend** - You'll find the `React` frontend, developed using `TypeScript`. The UI components are crafted with `shadcn`. For efficient data fetching and mutations, React Router DOM with loader API is employed.

- **Serverless** - Contains the serverless code written in `Python`. Utilizing `AWS SAM` this component hosts a step function. Triggered by events from `AWS EventBridge`, the step function performs tasks such as downloading video transcripts and creating video embeddings. This serverless architecture ensures for efficient asynchronous tasks.

## Tech Stack

1. **Full stack Javascript:**

   - React with TypeScript for a dynamic and type-safe user interface.
   - Nest.js with TypeScript for building a scalable and maintainable Node.js backend.

2. **Event Driven Programming:**

   - AWS EventBridge for seamless event-driven programming. When a user adds a video URL, an event triggers a serverless step function.

3. **Serverless:**

   - AWS SAM (Serverless Application Model) with Python for the serverless stack.
   - Serverless step function for handling asynchronous tasks such as downloading video transcripts and creating embeddings and finally saving the information to the database.

4. **Database:**

   - Xata as the database platform. Xata provides a PostgreSQL database with an easy-to-manage spreadsheet-like UI. It also offers simple and easy to use vector search capabilities.
   - Xata SDK for Node.js, offering a straightforward database interface, more user-friendly than traditional ORMs or query builders.

5. **Real-time Updates:**

   - Pusher.js for real-time updates to the frontend. After the Step Function processes tasks like downloading video information and creating embeddings, Pusher updates the frontend in real-time without requiring a manual refresh.

6. **Cohere LLM Platform:**

- Utilizing Cohere LLM endpoints for creating embeddings.
- Using Cohere Chat endpoint for chatbot functionality.
- Employing Cohere Re-rank endpoint to increase the relevancy of documents fetched using Xata vector search.

## App Workflow

1. **User Login:**

   - After logging in, the user enters the dashboard view.

2. **Collection Creation:**

   - In the dashboard, the user can create collections, similar to YouTube playlists, for grouping related videos.

3. **Collection Management:**

   - Collections are displayed on the left menu. The user can select a collection to view and manage its videos, including adding new videos.

4. **Video Addition:**

   - When a user adds a new video to a collection using just the URL, the data is saved to xata and then using the AWS SDK an event is add to AWS EventBridge.

5. **Serverless Processing:**

   - AWS EventBridge triggers a serverless step function, which downloads video information, transcripts, and creates embeddings using Cohere LLM. The data is then saved to Xata.

6. **Chat Functionality:**

   - Users can switch to the chat tab, where they can engage in conversations with all the videos in a collection. The backend utilizes the RAG framework with the Cohere LLM platform for intelligent chat functionality.

7. **Video Detail Page:**

   - Clicking on a video takes the user to the video detail page. Switching to the chat tab on this page allows the user to engage in real-time chat with the specific video.

8. **Global Chat:**
   - On the main dashboard, users can switch to the chat tab to engage in conversations with all the videos they have saved.

## Getting Started

To run the Bookmarks App locally, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yaldram/youtube-chat.git
   ```

2. **Start the Frontend and Backend Servers:**

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   ```bash
   cd backend
   npm install
   npm run start:dev
   ```

3. **Create and Configure the `.env` File:**

   Create a `.env` file in the root directory of the both the folders and copy over the variables from `.env.sample`

   The app will be accessible at `http://localhost:5173`.

4. **Serverless:**

   - `cd serverless/src`.
   - `pip install -r requirements.txt`
   - `cd ..`
   - `sam deploy --guided --capabilities CAPABILITY_IAM`

**Find detailed instructions in the README file located in each folder**.

## Improvments

- Leverage Xata's powerful search capabilities to enhance the search functionality for both collections and individual videos.
- Implement pagination in the videos section to enhance the user experience.
- Improve the chat experience by displaying references for generated chat responses. Providing context or sources for the chatbot's responses.
- Continuing App Improvements

## Challenges

- Despite using Cohere's Chat API with conversationId to manage history, frequent hits on the token limit have been observed.
- The current approach involves creating a new conversationId when the frontend component mounts, with conversations stored in local storage.
- To address this challenge, exploring alternatives such as LangChain and persisting the conversations may be considered.

## Contribution Guidelines

We welcome contributions from the community! If you'd like to contribute to the Bookmarks App project, please follow these guidelines:

- Fork the repository and create a new branch for your feature or bug fix.
- Make your changes and submit a pull request.
- Provide a clear and detailed description of your changes in the pull request.
