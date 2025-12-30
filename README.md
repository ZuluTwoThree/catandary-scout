# Catandary Scout

## Overview

Catandary Scout is a Vite + React + TypeScript frontend prepared for a multi-LLM scouting workflow and Hetzner-ready Docker deployment.

## Local Development (VS Code)

Prerequisites:
- Node.js 20+
- npm 10+

Steps:
```sh
git clone <YOUR_GIT_URL>
cd catandary-scout
npm install
cp .env.example .env
npm run dev
```

VS Code recommendations:
- Install the ESLint and Tailwind CSS IntelliSense extensions.
- Use the built-in TypeScript server for accurate type checking.

## Local Development (Docker)

Prerequisites:
- Docker Desktop

Steps:
```sh
cp .env.example .env
docker compose up --build
```

Services:
- Frontend: http://localhost:8080
- Backend proxy: http://localhost:8081
- Qdrant: http://localhost:6333

## Tech Stack

- Vite
- React
- TypeScript
- TanStack Query
- Tailwind CSS
- shadcn/ui

## Deployment (Hetzner)

Use the provided `Dockerfile` and `docker-compose.yml` as a base for your Hetzner setup. Ensure `.env` is configured with production API keys and URLs.
