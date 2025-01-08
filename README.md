
# Maraude Map

https://maraude-map.vercel.app/

The Maraude Map app is an interactive map to easily find the nearest maraude zones and paths, where non-profit organizations distribute food to people in the streets. Non-profits can also use the app to draw their zones and paths on the map, providing detailed information.

<p align="center">
  <img width="1460" alt="Capture d’écran 2024-12-12 à 17 28 19" src="https://github.com/user-attachments/assets/1ef60aa9-65d7-470b-82ec-332e1b71680e" />
</p>

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
  - [Using Docker](#using-docker)
- [Folder Structure](#folder-structure)
- [License](#license)

---

## Features

- Built with **Next.js 15** for fast and SEO-friendly rendering
- Styled with **Tailwind CSS 3**, a utility-first CSS framework
- Developed using **TypeScript 5** for robust type checking and maintainability
- Leverages **MapLibreGL 4**, an open-source mapping library for creating interactive maps
- Modular and reusable components for easier maintenance
- Dockerized for quick local deployment

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed on your machine:

- **Node.js** (v18.18.0 or later) – [Download Node.js](https://nodejs.org/)
- **npm** – comes with Node.js or can be installed separately

If you want to deploy using Docker and Docker Compose:
- **Docker** (v20.10 or later)
- **Docker Compose** (v2.0 or later)

The easiest and recommended way to get Docker and Docker Compose is to install [Docker Desktop](https://www.docker.com/products/docker-desktop/). It includes Docker Compose along with Docker Engine and Docker CLI, which are Compose prerequisites.

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/antoineludeau/maraude-map.git
   cd maraude-map
   ```

2. **Install dependencies**

Using npm:

  ```bash
  npm install
  ```

This step is not needed for a Docker deployment.

### Running the Development Server

Once all dependencies are installed, you can start the development server:

  ```bash
  npm run dev
  ```

Open http://localhost:3000 in your browser to see the running application.

This step is not needed for a Docker deployment.

### Using Docker

You can also run the application locally using Docker for a containerized environment.

Simply run the command:

  ```bash
  docker compose up --build -d
  ```

Open http://localhost:3000 in your browser to view the application.

## Folder Structure

```bash
  maraude-map/
  ├── app/                    # Next.js 'app' directory for routing and pages
  ├── components/             # Reusable UI components
  ├── data/                   # Maraude data set for testing purpose
  ├── public/                 # Static assets (images, fonts, etc.)
  ├── types/                  # Typescript types definition
  ├── .dockerignore           # Docker ignore file
  ├── .eslintrc.json          # ESLint configuration file
  ├── .gitignore              # Git ignore file
  ├── compose.yml             # Docker Compose configuration
  ├── Dockerfile              # Docker configuration for production
  ├── Dockerfile.dev          # Docker configuration for development
  ├── LICENSE.md              # License file
  ├── next.config.mjs         # Next.js configuration file
  ├── package-lock.json       # Lock file for npm dependencies
  ├── package.json            # Project dependencies and scripts
  ├── postcss.config.mjs      # PostCSS configuration for Tailwind CSS
  ├── README.md               # Documentation for the project
  ├── tailwind.config.ts      # Tailwind CSS configuration
  └── tsconfig.json           # TypeScript configuration file
```

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE.md) file for details.

