# Ad-Pulse Dashboard

A real-time advertising operations dashboard built with Next.js 16, React 19, and Zustand for state management.

## Setup Instructions

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd ad-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Create production build  |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## Architecture

### Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **Zustand** - Lightweight state management
- **Recharts** - Data visualization
- **Tailwind CSS 4** - Utility-first styling
- **TypeScript** - Type safety

### Architectural Decisions

#### 1. Zustand for State Management

**Choice:** Zustand over Redux or React Context

**Why:**

- Minimal boilerplate compared to Redux
- Simple API that scales well for medium-sized applications

#### 2. Colocation of Types

**Choice:** Centralized type definitions in `lib/types.ts`

**Why:**

- Shared across components and store
- Easy to maintain and refactor

## What I Would Improve With More Time

### Testing

- Add unit tests with Jest/Vitest for utility functions

### Performance

- Implement virtualization for large campaign tables (react-window)
- Add pagination or infinite scroll for scalability

### Features

- Date range filters for historical data
- Export functionality (CSV/PDF)
- Search across campaign names
- Replace mock data with real API integration
