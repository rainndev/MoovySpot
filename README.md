# MoovySpot

MoovySpot is a modern movie discovery web application built with **Vite**, **TailwindCSS**, **Zustand**, **Zod**, **Shadcn**, **Framer Motion**, **TanStack Router**, **TanStack Query**, and **Axios**. It fetches data from the **TMDB API** to provide users with movie and TV show details, watchlists, and more.

> **Note:** This project is created for **educational purposes only** and is **not intended for commercial use**.

---

## 🚀 Features

- **Trending** movies and TV shows of the day and week
- **Upcoming** movies
- **Movie and TV details** with full information
- **Watchlist** for saving favorite movies and shows
- **Category browsing** by movie genres
- **Search feature** for movies and TV shows
- **Recently viewed list** that remembers all-time viewed titles
- **Episode list** for TV shows with thumbnails and titles

---

## 🛠️ Tech Stack

- **Frontend:** Vite + React + TypeScript
- **Styling:** TailwindCSS + Shadcn/UI + Framer Motion
- **State Management:** Zustand
- **Form Validation:** Zod
- **Routing:** TanStack Router
- **Data Fetching:** TanStack Query + Axios
- **API Source:** TMDB API

---

## 📦 Installation

```bash
git clone https://github.com/rainndev/MoovySpot.git
cd MoovySpot
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory using the format below:

```env
VITE_TMDB_API_KEY = "YOUR API KEY FROM TMDB"
VITE_NAME_CREATOR = "CREATOR NAME"
VITE_TMDB_API_BASE_URL = "https://api.themoviedb.org/3"
```

---

## 🧠 License

Permission is hereby granted to any person obtaining a copy of this software (the “Software”) to use, copy, and modify the Software for personal or educational purposes only, subject to the following conditions:

### Non-Distribution

You may not distribute, publish, sublicense, sell, or otherwise make the Software, or any derivative works thereof, publicly available in any form.

### Attribution

You must retain the above copyright notice and this license in all copies or substantial portions of the Software.

### No Warranty

The Software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the Software or the use or other dealings in the Software.
