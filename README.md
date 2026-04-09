# -tokenization 🚀

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC) [![Node Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/) [![npm](https://img.shields.io/badge/npm-latest-orange)](https://www.npmjs.com/)

---

## Description

-tokenization is a Node.js project demonstrating token encoding and decoding using the `js-tiktoken` library, designed to offer efficient tokenization utilities powered by state-of-the-art algorithms.

---

## Table of Contents

1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Getting Started](#getting-started)
4. [Environment Variables](#environment-variables)
5. [Usage](#usage)
6. [Project Folder Structure](#project-folder-structure)
7. [Dependencies](#dependencies)
8. [Contributing](#contributing)
9. [License](#license)
10. [Author](#author)

---

## Features ✨

- Token encoding and decoding using `js-tiktoken`
- Modular project structure with agentic AI components
- Integration-ready for OpenAI API usage and Langchain libraries
- Usage examples included for quick start

---

## Prerequisites 📋

- Node.js version >= 16.0.0
- npm latest version
- OpenAI API key (for any API interactions)

---

## Getting Started 🏁

Clone the repository:

```bash
git clone https://github.com/yourusername/tokenization.git
cd tokenization
```

Install dependencies:

```bash
npm install
```

Setup your `.env` file based on the example below.

Run the project (no start script is defined, run token.js via node):

```bash
node token.js
```

---

## Environment Variables ⚙️

Create a `.env` file in the root directory with the following placeholder variables:

```env
OPENAI_API_KEY=your_openai_api_key_here
OTHER_ENV_VAR=your_value_here
```

---

## Usage 💻

Example token encoding and decoding usage from `token.js`:

```js
import { Tiktoken } from "js-tiktoken/lite";
import o200k_base from "js-tiktoken/ranks/o200k_base";

const enc = new Tiktoken(o200k_base);
const userQuery = "Hey there I am Dinesh Budhathoki";
const tokens = enc.encode(userQuery);
console.log(tokens);

const inputTokens = [
  25216, 1354, 357, 939, 415, 2028, 71, 14523, 71, 725, 25310,
];
const decoded = enc.decode(inputTokens);
console.log({ decoded });

// Example next token prediction (stub)
const predictNextToken = (tokens) => {
  return 6584;
};
while (true) {
  const nextToken = predictNextToken(tokens);
  if (nextToken === "END") break;
  tokens.push(nextToken);
}
```

---

## Project Folder Structure 📂

```
/tokenization
├── agentic
│   ├── agenticAI.js
│   ├── README.md
│   ├── readmeAgent.js
│   └── todo_app
├── embeddings.js
├── node_modules
├── package.json
├── package-lock.json
├── prompts
├── rag
├── .env
├── .gitignore
└── token.js
```

---

## Dependencies 📦

- `@langchain/community`, `@langchain/core`, `@langchain/openai`, `@langchain/qdrant`: Langchain ecosystem libraries for AI model management and Qdrant integration.
- `axios`: Promise based HTTP client for making API requests.
- `dotenv`: For environment variable management.
- `js-tiktoken`: Tokenization utilities compatible with OpenAI models.
- `openai`: Official OpenAI Node.js SDK.
- `pdf-parse`: PDF file parsing utility.

---

## Contributing 🤝

Contributions are welcome! Please follow the standard Git workflow:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes with clear messages.
4. Push the branch to your fork.
5. Open a Pull Request describing your changes.

---

## License 📜

This project is licensed under the ISC License - see the [LICENSE](https://opensource.org/licenses/ISC) file for details.

---

## Author 👤

Dinesh Budhathoki

- GitHub: [https://github.com/dineshbudhathoki](https://github.com/dineshbudhathoki)

---

⭐️ Thank you for checking out this project! ⭐️
