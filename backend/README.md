<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Youtube Chat Backend

The backend for the Youtube Chat App is a REST API built using the powerful Nest.js framework. Here are key points about the backend implementation:

- Utilizes the Xata database service (https://xata.io/), providing a PostgreSQL database. Xata offers a spreadsheet-like viewer, a simple SDK, built-in search, vector search, file attachments, database branching, and generous free-tier options. It simplifies database interactions, making it an excellent choice for developers.

- Adds an event to AWS EventBridge when a YouTube video is added to the table. A dedicated module, located in `modules/event-bridge`, handles this functionality.

- Implements Cohere's LLM (Large Language Model) platform for chat functionality. The powerful platform offers chat, embedding, and re-ranking functionalities. A dedicated module, located in `src/modules/cohere`, manages Cohere integration.

- Organizes all routes inside the `src/routes` folder for better code organization and maintainability.

- Utilizes normal JWT token authentication with Passport strategies. The JWT token is set inside the cookie with the `httpOnly` attribute for enhanced security.

- Implements Zod for validating requests with Nest.js DTO (Data Transfer Object).

- Nest.js is a powerful and well-structured way of writing Node.js backends. The framework provides an organized and scalable architecture.

### Schema

![DB Schema](https://pub-2e209747425f40cdacae2d98eae729f3.r2.dev/youtube-chat-schema.png)

### Setup Xata

Follow these steps to get started with Xata and set up your project:

- Visit [Xata](https://xata.io/) and sign up for a new account. It's free!

- Install the Xata CLI globally using npm:

  ```bash
  npm install -g @xata.io/cli
  ```

- Authenticate yourself by logging in from the command line:

  ```bash
  xata auth login
  ```

- Log in to the [Xata Dashboard](https://xata.io/) and create a new project, or use the following command to initialize a new project:

  ```bash
  xata init —schema=schema.json
  ```

- Passing the schema parameter to the init command will create the ``.xatarc` and `src/config/xata.ts` for the user's own DB. You might need to create a `config` folder under `src`.

## API Routes

### Videos

| Endpoint                   | Description                                                    |
| -------------------------- | -------------------------------------------------------------- |
| `POST /api/videos`         | Create a new video using the given payload.                    |
| `GET /api/videos/:videoId` | Retrieve details for a specific video identified by `videoId`. |

### Collections

| Endpoint                                      | Description                                                                       |
| --------------------------------------------- | --------------------------------------------------------------------------------- |
| `GET /api/collections`                        | Retrieve all collections for the authenticated user. Requires JWT authentication. |
| `GET /api/collections/:collectionId/videos`   | Retrieve videos within a specific collection. Requires JWT authentication.        |
| `GET /api/collections/:collectionId/videoIds` | Retrieve video IDs within a specific collection. Requires JWT authentication.     |
| `POST /api/collections`                       | Create a new collection for the authenticated user. Requires JWT authentication.  |

### Chat

| Endpoint                        | Description                                     |
| ------------------------------- | ----------------------------------------------- |
| `POST /api/chat/videos`         | Initiate a chat for a specific video.           |
| `POST /api/chat/collections`    | Initiate a chat for all videos in a collection. |
| `POST /api/chat/knowledge-base` | Initiate a chat for the entire knowledge base.  |

### Authentication

| Endpoint                 | Description                                                                         |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `POST /auth/register`    | Register a new user.                                                                |
| `POST /auth/login`       | Log in a user and set JWT token in an HTTP-only cookie.                             |
| `POST /auth/logout`      | Log out the authenticated user by clearing JWT cookie. Requires JWT authentication. |
| `GET /auth/authenticate` | Authenticate and retrieve user details. Requires JWT authentication.                |

## Installation

```bash
# install dependencies
npm install

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
