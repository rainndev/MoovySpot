<div align="center">
  <img src="https://github.com/user-attachments/assets/e0e71a2c-a4ba-4ba3-b8a5-b0cdd19390fb" alt="MoovySpot homepage screenshot" width="100%" />

# MoovySpot

A modern movie and TV show discovery web application built with React, TypeScript, and Tailwind CSS, powered by the TMDB API.

[Live Demo](https://moovy-spot.pages.dev/) &middot; [Report a Bug](https://github.com/rainndev/MoovySpot/issues) &middot; [Request a Feature](https://github.com/rainndev/MoovySpot/issues)

[![Live Demo](https://img.shields.io/badge/Live_Demo-Cloudflare_Pages-F38020?style=flat&logo=cloudflarepages&logoColor=F38020)](https://moovy-spot.pages.dev/)
[![E2E Tests](https://img.shields.io/badge/Playwright_E2E-passing-brightgreen?style=flat)](https://github.com/rainndev/MoovySpot/tree/main/src/e2e)
[![License](https://img.shields.io/badge/License-Educational_Use_Only-007EC7?style=flat)](#license)

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=61DAFB)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat&logo=vite&logoColor=646CFF)](https://vite.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat&logo=typescript&logoColor=3178C6)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=06B6D4)](https://tailwindcss.com)

[![Zustand](https://img.shields.io/badge/Zustand-5-22272D?style=flat)](https://github.com/pmndrs/zustand)
[![TanStack Router](https://img.shields.io/badge/TanStack_Router-v1-24292E?style=flat&logo=tanstack&logoColor=white)](https://tanstack.com/router)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-24292E?style=flat&logo=tanstack&logoColor=white)](https://tanstack.com/query)
[![Zod](https://img.shields.io/badge/Zod-4-408AFF?style=flat&logo=zod&logoColor=408AFF)](https://zod.dev)
[![Axios](https://img.shields.io/badge/Axios-1.x-5A29E4?style=flat&logo=axios&logoColor=5A29E4)](https://axios-http.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=flat&logo=framer&logoColor=0055FF)](https://motion.dev)

[![TMDB](https://img.shields.io/badge/Data-TMDB_API-01B4E4?style=flat&logo=themoviedatabase&logoColor=01B4E4)](https://www.themoviedb.org)

</div>

## About

MoovySpot is a modern movie discovery web application that fetches data from the **TMDB API** to provide users with movie and TV show details, watchlists, and more. It is built with **Vite**, **TailwindCSS**, **Zustand**, **Zod**, **Shadcn/UI**, **Framer Motion**, **TanStack Router**, **TanStack Query**, and **Axios**.

> **Note:** This project is created for **educational purposes only** and is **not intended for commercial use**.

## Features

- **Trending** movies and TV shows of the day and week
- **Upcoming** movies
- **Movie and TV details** with full information
- **Watchlist** for saving favorite movies and shows
- **Category browsing** by movie genres
- **Search feature** for movies and TV shows
- **Recently viewed list** that remembers all-time viewed titles
- **Episode list** for TV shows with thumbnails and titles
- **Low Power Mode** with automatic TV browser detection

## Tech Stack

| Layer            | Technology                |
| ---------------- | ------------------------- |
| Framework        | React 19, Vite 6          |
| Language         | TypeScript 5.8            |
| Styling          | Tailwind CSS 4, Shadcn/UI |
| State Management | Zustand 5                 |
| Routing          | TanStack Router 1         |
| Data Fetching    | TanStack Query 5, Axios   |
| Animation        | Framer Motion 12          |
| Validation       | Zod 4                     |
| API Source       | TMDB API                  |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (v20 or later recommended)
- [pnpm](https://pnpm.io)

### Installation

```bash
git clone https://github.com/rainndev/MoovySpot.git
cd MoovySpot
pnpm install
```

### Environment Variables

Create a `.env` file in the root directory using the format below:

```env
VITE_TMDB_API_KEY = "YOUR API KEY FROM TMDB"
VITE_NAME_CREATOR = "CREATOR NAME"
VITE_TMDB_API_BASE_URL = "https://api.themoviedb.org/3"
```

### Available Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `pnpm dev`      | Start the development server         |
| `pnpm build`    | Type-check and build for production  |
| `pnpm preview`  | Preview the production build locally |
| `pnpm lint`     | Run ESLint across the project        |
| `pnpm test:e2e` | Run Playwright end-to-end tests      |

## Acknowledgments

- Data provided by [TMDB](https://www.themoviedb.org). This product uses the TMDB API but is not endorsed or certified by TMDB.
- Inspiration for the design and architecture comes from modern streaming platforms.

## License

Permission is hereby granted to any person obtaining a copy of this software (the “Software”) to use, copy, and modify the Software for personal or educational purposes only, subject to the following conditions:

### Non-Distribution

You may not distribute, publish, sublicense, sell, or otherwise make the Software, or any derivative works thereof, publicly available in any form.

### Attribution

You must retain the above copyright notice and this license in all copies or substantial portions of the Software.

### No Warranty

The Software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the Software or the use or other dealings in the Software.
