# 🧠 Zov Cognitive Sandbox

[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![Poetry](https://img.shields.io/badge/poetry-package_manager-purple.svg)](https://python-poetry.org/)
[![Black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)
[![pytest](https://img.shields.io/badge/tested%20with-pytest-green.svg)](https://pytest.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 1. Overview: An Engine for Novel Ideas

**Zov Cognitive Sandbox** is a versatile tool for thought, creativity, and research. It leverages the power of advanced generative models to help you explore any topic, discover hidden connections, and generate novel hypotheses.

This application has two core components:

*   **The Sandbox:** A general-purpose creative environment where you can paste any text—an article, a research paper, a block of code, or your own raw ideas—and use the integrated **HNE (Hypothetical/Novel/Exploratory) Engine** to analyze the content and generate new, speculative ideas.
*   **The Framework Deep Dive:** An educational section that provides a complete, in-depth breakdown of the **Zov Cognitive Engine Blueprint (ZCEB v4.0)**, the powerful theoretical framework that powers this application. This is a living document that explains the science and philosophy behind the tool.

This project is a live, operational tool that *uses* the ZCEB framework to provide value, with the blueprint itself serving as a transparent, explorable foundation.

### 📚 Key Documents

*   **[How to Contribute](./CONTRIBUTING.md)**: Guidelines for contributing code, data, or adversarial reviews.
*   **[Code of Conduct](./CODE_OF_CONDUCT.md)**: Our community standards.

---

## 2. 🚀 Quick Setup & Installation

This project is managed with [Poetry](https://python-poetry.org/) for dependency management and environment setup.

**Prerequisites:**
*   Python 3.10+
*   `git`
*   `poetry` (You can install it via `pip install poetry`)

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/zov-cognitive-sandbox.git
cd zov-cognitive-sandbox

# 2. Run the automated setup script
chmod +x ./scripts/setup_environment.sh
./scripts/setup_environment.sh

# 3. Activate the virtual environment
source .venv/bin/activate

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
├── configs/      # Experiment configuration
├── data/         # Core data (ZCEB document)
├── docs/         # Project documentation and rubrics
├── public/       # Static assets
├── src/          # Main Python source code
│   └── zceb/
│       ├── cli/
│       ├── core/
│       ├── monitors/
│       ├── training/
│       └── utils/
├── tests/        # Pytest unit tests
│
├── .gitignore
├── Dockerfile    # For containerized runs
├── LICENSE
├── package.json  # Frontend dependencies
├── pyproject.toml# Python dependencies
└── README.md     # You are here
```
