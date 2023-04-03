# LiViz - Live Visualization

Frontend part of the LiViz project, powered by Next.JS, Ant Design, ECharts, etc.

## Getting Started

1. Make sure Node.js is installed on the local machine. This project is developed on `v18.15.0`. Other versions may works as well, but not tested.
2. Clone the project and `cd lvz-frontend`.
3. Install dependencies. `npm install`.
4. Customize key configurations. Create file `.env.local` via copying and pasting content of file `.env`. Open `.env.local` with file editor, make necessary changes, then save file.
    - `NEXT_PUBLIC_BACKEND_URL`: root URL of the [backend](https://github.com/LiViz-cc/lvz-backend-v2) service, do NOT add `/` at the end of URL
5. Start development server. `npm run dev`.
6. Open browser and see the development server running at `http://localhost:3000`.

## Deployment

### Deploy to Vercel

// TODO: one click deployment link

### Deploy to AWS via Docker

// TODO: docker generation workflow and deployment config explanation
