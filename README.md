# 🗺️ Treasure Hunt Game

A fun and interactive **Treasure Hunt** game built with **Next.js** using the **App Router** (`/app`). Explore, solve clues, and find the hidden treasure!

---

## Features

- Multi-page treasure hunt adventure
- Easy navigation between clues and challenges
- Modern Next.js App Router structure (`/app`)

---

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Open your browser and go to http://localhost:3000
to start your treasure hunt adventure!

---

## Project Structure

```
treasure-hunt-game-frontend/
├── app/                      # Pages and routes using App Router
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Basic layout file for metadata etc
│   ├── globals.css           # Global styles
│   ├── assets/               # Assets like favicon
│   ├── components/           # React Components
│   │   ├── arrowbutton/
│   │   │   └── ArrowButton.tsx
│   │   ├── Button/
│   │   │   └── Button.tsx
│   │   ├── Card/
│   │   │   └── Card.tsx
│   │   └── input/
│   │       └── Inputfield.tsx
│   ├── identity/             # Identity page to type in username
│   │   └── identity.tsx
│   ├── map/                  # Map page
│   │   └── page.tsx
│   ├── quiz/                 # Quiz page
│   │   └── page.tsx
│   ├── story/                # Story page
│   │   └── page.tsx
│   └── styles/               # CSS modules
│       └── escapeRoom.module.css
├── public/                   # Static assets (images, sounds, etc.)
├── package.json
├── next.config.ts
├── eslint.config.mjs
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

> **_NOTE:_** All pages are located in the /app folder following Next.js App Router conventions.

---

## Available Scripts

| Command         | Description                         |
| --------------- | ----------------------------------- |
| `npm run dev`   | Start the development server        |
| `npm run build` | Build the project for production    |
| `npm run start` | Start the production server         |
| `npm run lint`  | Run ESLint to check for code issues |

<img width="1916" height="886" alt="Escape room" src="https://github.com/user-attachments/assets/290d0e5c-a1a8-4afb-abd9-3e01e45d03f5" />
<img width="1886" height="863" alt="Screenshot 2026-02-20 120059" src="https://github.com/user-attachments/assets/357f781f-c6a3-44a2-a9dd-4eeb8532851a" />

