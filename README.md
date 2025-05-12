# MedZone - Next.js Web Application

This is the Next.js web application for MedZone, a platform for medical professionals and students.

## Project Overview

MedZone aims to provide a collaborative space for sharing knowledge, accessing educational resources, and connecting with peers in the medical field. This Next.js application will serve as the primary web interface.

## Features (Planned)

- User Authentication & Profiles
- Content Posting and Sharing (Posts, Articles, Files)
- Real-time Chat (Private and Group)
- Notifications System
- Comprehensive Search Functionality
- Categorized Content (Specialties, File Types, Study Years)
- Digital Library for Educational Materials
- User Groups for Focused Discussions
- Event Calendar for Academic and Professional Events
- Personal Resource Management ("My Resources")
- Application Settings
- Help and Support Section

## Tech Stack

- **Framework:** Next.js (with React)
- **Styling:** Tailwind CSS (comes with the template)
- **UI Components:** shadcn/ui (comes with the template)
- **Icons:** Lucide Icons (comes with the template)
- **Charts:** Recharts (comes with the template)
- **Backend/Database:** (To be integrated, potentially Firebase or a custom backend if D1 is not sufficient for all needs)
- **Deployment:** Cloudflare Pages (template is optimized for this)

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd MedZone_Next
    ```

2.  **Install dependencies:**
    The template uses `pnpm` by default.
    ```bash
    pnpm install
    ```
    If you prefer npm or yarn:
    ```bash
    # npm install
    # or
    # yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file if needed for specific API keys or configurations.

4.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app/`: Contains all the application pages/routes.
- `src/components/`: Shared UI components.
- `src/lib/`: Utility functions and libraries.
- `src/hooks/`: Custom React hooks.
- `migrations/`: D1 database migration files (if D1 is used).
- `public/`: Static assets.
- `wrangler.toml`: Configuration for Cloudflare Workers (including D1 database if enabled).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

