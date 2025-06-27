
# Irish Amateur Radio HAREC Learning System

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Gemini API](https://img.shields.io/badge/Gemini_API-4285F4?style=for-the-badge&logo=google&logoColor=white)

An interactive, AI-enhanced web application designed to help aspiring amateur radio operators in Ireland study for their HAREC (Harmonised Amateur Radio Examination Certificate) exam. This platform provides structured learning modules, detailed topics, interactive quizzes, and an AI-powered study assistant.

## ✨ Key Features

*   **Structured Curriculum**: Content is organized into key modules: Regulatory, Technical, Operational, and Safety.
*   **Detailed Topics**: Each module contains in-depth topics covering all aspects of the HAREC syllabus.
*   **Interactive Quizzes**: Test your knowledge with multiple-choice quizzes at the end of each topic, complete with scoring and instant feedback.
*   **Progress Tracking**: Automatically saves your completed topics and overall progress to `localStorage`.
*   **AI Study Buddy**: A floating chat assistant powered by the Google Gemini API. It can answer questions and explain concepts in the context of the topic you are currently studying.
*   **Bookmarking**: Mark important topics for easy review.
*   **Responsive Design**: A clean, modern UI that works seamlessly on desktop, tablet, and mobile devices.
*   **Light/Dark Mode**: Toggle between light and dark themes for comfortable viewing.
*   **Search Functionality**: Quickly find specific topics across all learning modules.

## 📸 Screenshots

*(Add screenshots of the application here to showcase the UI)*

| Main Dashboard | Topic View | Quiz View |
| :---: | :---: | :---: |
| `[Screenshot of Dashboard]` | `[Screenshot of Topic]` | `[Screenshot of Quiz]` |

| AI Chat Assistant | Mobile View |
| :---: | :---: |
| `[Screenshot of Chat]` | `[Screenshot of Mobile]` |

## 🛠️ Tech Stack

*   **Frontend**: [React](https://react.dev/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **AI**: [Google Gemini API](https://ai.google.dev/)

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or newer recommended)
*   [npm](https://www.npmjs.com/) (or your preferred package manager like yarn, pnpm)
*   A Google Gemini API Key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/irish-amateur-radio-harec-learning-system.git
    cd irish-amateur-radio-harec-learning-system
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env` in the root of the project and add your Gemini API key:
    ```.env
    GEMINI_API_KEY="YOUR_API_KEY_HERE"
    ```
    The Vite configuration (`vite.config.ts`) is already set up to load this variable.

### Available Scripts

*   **Run the development server:**
    Starts the app in development mode with hot-reloading.
    ```sh
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) (or the port specified in your terminal) to view it in your browser.

*   **Build for production:**
    Bundles the app for production to the `dist` folder.
    ```sh
    npm run build
    ```

*   **Preview the production build:**
    Serves the `dist` folder to preview the production build locally.
    ```sh
    npm run preview
    ```

## 🤖 AI Study Buddy Integration

The application integrates the Google Gemini API to provide an intelligent chat assistant.

*   The chat session is initialized with a system prompt that gives the AI its persona ("EI-AI," an expert tutor for the Irish HAREC exam).
*   When a user opens the chat from a specific topic page, the content of that topic is added to the AI's context. This allows for highly relevant, context-aware answers.
*   The chat history is managed within the React state, providing a seamless conversational experience.

## 📂 Project Structure

```
/
├── public/
├── src/
│   ├── App.tsx             # (Legacy/Duplicate)
│   ├── index.css           # Main CSS and Tailwind styles
│   ├── index.tsx           # Main application component and entry point
│   └── ...                 # Other assets
├── .env                    # Environment variables (you create this)
├── .gitignore
├── index.html              # HTML entry point
├── package.json
├── README.md               # This file
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build configuration
```
