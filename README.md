# MedZone - Next.js Web Application (Phase 2 - Content Development)

This README provides an overview of the MedZone Next.js web application after the completion of Phase 2, which focused on developing full content and initial designs for all primary pages.

## Project Overview

MedZone is a platform designed for medical professionals and students to connect, share knowledge, and access resources. This Next.js version provides a responsive web interface for the application.

## Phase 2 Achievements:

*   **Full Content Development:** All 12 primary pages now have detailed content, including text, sections, and mock data to simulate a live application.
*   **UI/UX Enhancements:** Pages have been designed using Tailwind CSS and components from shadcn/ui, providing a modern and clean user interface.
*   **Interactive Elements:** Basic interactive elements, filters, and navigation have been implemented on relevant pages.
*   **Comprehensive Internationalization (i18n):** All user-facing text across all 12 pages has been internationalized and is available in both English and Arabic. The application uses `next-i18next` for this purpose.
*   **Detailed Page Structures:** Each page now reflects its intended functionality as per the initial specifications:
    *   **Home:** Displays posts, stories, filters, and AI-suggested content.
    *   **Chat:** Features private and group chats, message display, and input.
    *   **Notifications:** Shows various types of alerts and interactions.
    *   **Profile:** Displays user information, posts, saved items, groups, and an about section.
    *   **Search:** Allows comprehensive searching across users, posts, files, and groups with filtering.
    *   **Categories:** Provides content classification by specialty, file type, and academic year.
    *   **Library:** Acts as a repository for educational files and references with search and filtering.
    *   **Groups:** Enables users to join, create, and interact within medical interest groups.
    *   **Calendar:** Allows users to manage and view medical events and schedules.
    *   **My Resources:** A personal space for saved files, posts, notes, drafts, and storage management.
    *   **Settings:** Includes account, notification, privacy, language, and account management options.
    *   **Help & Support:** Offers FAQs, contact support, and links to legal documents.

## Project Structure

*   `MedZone_Next/`
    *   `public/`
        *   `locales/`: Contains JSON files for English (`en/common.json`) and Arabic (`ar/common.json`) translations.
        *   `avatars/`, `covers/`, `posts/`: Placeholder images for mock data.
    *   `src/`
        *   `app/`: Contains subdirectories for each page (e.g., `Home`, `Chat`, `Profile`), each with a `page.tsx` file.
        *   `components/`: Reusable UI components (e.g., `CustomButton.tsx`, and shadcn/ui components).
        *   `lib/`: Utility functions, including `i18n.ts` for internationalization setup.
        *   `styles/`: Global styles.
    *   `next.config.js`: Next.js configuration file.
    *   `next-i18next.config.js`: Configuration for `next-i18next`.
    *   `package.json`: Project dependencies and scripts.
    *   `README.md`: This file.

## Getting Started

To run the project locally:

1.  **Unzip the Project:** Extract the `MedZone_Next_Content_Developed.zip` file.
2.  **Navigate to Project Directory:**
    ```bash
    cd MedZone_Next
    ```
3.  **Install Dependencies:**
    It is recommended to use `pnpm` as used during development, but `npm` or `yarn` should also work.
    ```bash
    pnpm install 
    # or
    # npm install
    # or
    # yarn install
    ```
4.  **Run the Development Server:**
    ```bash
    pnpm dev
    # or
    # npm run dev
    # or
    # yarn dev
    ```
5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Key Technologies Used

*   **Next.js:** React framework for server-side rendering and static site generation.
*   **React:** JavaScript library for building user interfaces.
*   **TypeScript:** Superset of JavaScript that adds static typing.
*   **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
*   **shadcn/ui:** Re-usable components built using Radix UI and Tailwind CSS.
*   **next-i18next & i18next:** For internationalization (English and Arabic).
*   **Lucide React:** Icon library.

## Next Steps

*   Implement backend functionality (e.g., using Firebase or a custom API).
*   Connect to a real database for dynamic content.
*   Develop AI features (smart assistant, content suggestions).
*   Implement user authentication and authorization.
*   Refine UI/UX based on user feedback.
*   Add more comprehensive testing.

This version provides a solid foundation with fully fleshed-out frontend pages. We hope this detailed implementation meets your expectations for this phase.

