# Youtube Chat Frontend

The frontend code for the Youtube Chat App is written in TypeScript and utilizes Vite as the bundler. Here are key points about the frontend implementation:

- Utilizes React Router DOM's loaders and actions for seamless data fetching and mutation.

- ShadCN and Tailwind are used for styling React components, ensuring a visually appealing and responsive UI.

- Implements ShadCN's multiple themes with Tailwind and CSS variables to create dynamic dark and light themes.

- All routes are organized under `src/routes`. Nested routes for a particular route are placed in the same folder. For example, `src/routes/dashboard/pages` includes nested routes for the dashboard page.

- Using `conform` forms with `zod` for managing the form inputs, validations, accessiblitiy, focus states.

- Implements backend authentication using standard JWT tokens set as HTTP-only cookies. `credentials: true` is used in fetch calls to handle authentication.

- Utilizes Pusher for real-time app updates. Refer to `.env.sample` for environment variable configuration. Create a new Pusher channel and update values by following instructions [here](https://pusher.com/tutorials/realtime-results-nodejs/).

## Getting Started

1. Install dependencies: `npm install`
2. Run the development server: `npm run dev`
3. Access the application at `http://localhost:5173`
