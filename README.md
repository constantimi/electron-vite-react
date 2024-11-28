# electron-vite-react

A project template for building Electron applications with Vite and React.

## Overview

| Section                                 | Description                                       |
| --------------------------------------- | ------------------------------------------------- |
| [Introduction](#introduction)           | Overview of the project template and its purpose. |
| [Features](#features)                   | Key features and benefits of using this template. |
| [Quick Setup](#quick-setup)             | Prerequisites and installation instructions.      |
| [Project Structure](#project-structure) | Explanation of the project's directory layout.    |
| [Contributing](#contributing)           | Guidelines for contributing to the project.       |
| [License](#license)                     | Information about the project's license.          |

## Introduction

This template provides a starting point for building desktop applications using Electron, Vite, and React. It includes a basic setup with hot-reloading and optimized build configurations.

## Features

-   Electron for cross-platform desktop applications
-   Vite for fast development and build
-   React for building user interfaces
-   Hot-reloading for development

## Quick Setup

### Prerequisites

Ensure you have the following installed:

-   Node.js (>=14.x)
-   npm (comes with Node.js)

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/constantimi/electron-vite-react.git
    cd electron-vite-react
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Running the Application

    To start the development server with hot-reloading:

    ```sh
    npm run dev
    ```

    To build the application for production and package the application:

    ```sh
    npm run build
    ```

## Project Structure

```
electron-vite-react/
├── public/             # Static assets
├── src/                # Source code
│   ├── lang/           # Localization files
│   └── App.tsx         # Main React component
├── package.json        # Project metadata and scripts
└── vite.config.js      # Vite configuration
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
