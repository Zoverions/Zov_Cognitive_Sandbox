# 🧠 Zov Cognitive Sandbox

[![React](https://img.shields.io/badge/react-^19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/vite-^6-purple.svg)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-~5.8-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 1. Overview: An Engine for Novel Ideas

**Zov Cognitive Sandbox** is a versatile tool for thought, creativity, and research. It leverages the power of advanced generative models to help you explore any topic, discover hidden connections, and generate novel hypotheses.

This application has three core components:

*   **The Sandbox:** A general-purpose creative environment where you can paste any text—an article, a research paper, a block of code, or your own raw ideas—and use the integrated **HNE (Hypothetical/Novel/Exploratory) Engine** to analyze the content and generate new, speculative ideas.
*   **The Framework Deep Dive:** An educational section that provides a complete, in-depth breakdown of the **Zov Cognitive Engine Blueprint (ZCEB v4.0)**, the powerful theoretical framework that powers this application.
*   **How It Works:** An interactive documentation page that explains the core concepts of the ZCEB framework.

This project is a live, operational tool that *uses* the ZCEB framework to provide value, with the blueprint itself serving as a transparent, explorable foundation.

### 📚 Key Documents

*   **[How to Contribute](./CONTRIBUTING.md)**: Guidelines for contributing code, data, or adversarial reviews.
*   **[Code of Conduct](./CODE_OF_CONDUCT.md)**: Our community standards.

---

## 2. 🚀 Quick Setup & Installation

This project is built with [Vite](https://vitejs.dev/) and [React](https://react.dev/).

**Prerequisites:**
*   Node.js (v18 or higher)
*   `npm`

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/zov-cognitive-sandbox.git
cd zov-cognitive-sandbox

# 2. Install dependencies
npm install

# 3. Set up your environment variables
# Create a .env file in the root of the project
cp .env.example .env
# Add your Gemini API key to the .env file
GEMINI_API_KEY=your_api_key_here

# 4. Run the development server
npm run dev
```
The application will be available at `http://localhost:3000`.

---

## 3. 📂 Repository Structure

The repository is organized into distinct functional areas:

```
zov-cognitive-sandbox/
│
├── .github/      # CI/CD workflows
├── components/   # React components
├── data/         # Core data (ZCEB document)
├── docs/         # Project documentation and rubrics
├── lib/          # Helper functions (e.g., parser)
├── services/     # API services (e.g., Gemini)
│
├── .gitignore
├── index.html    # Main HTML entry point
├── package.json  # Project dependencies and scripts
└── README.md     # You are here
```
