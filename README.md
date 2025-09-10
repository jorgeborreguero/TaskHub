# TaskHub

A fullstack productivity platform for task management, time tracking, and team collaboration. Built with React (frontend) and ASP.NET Core (backend), using MongoDB for persistence. Designed for modern workflows and professional portfolios.

## Features

-   User authentication (JWT)
-   Weekly calendar view
-   Task creation, assignment, and status management
-   Time tracking per user and per task
-   Responsive UI with HeroUI and Tailwind CSS
-   RESTful API with .NET 9
-   MongoDB integration
-   Dockerized for easy deployment

## Technologies

-   **Frontend:** React, TypeScript, HeroUI, TanStack Query, Tailwind CSS, Vite
-   **Backend:** ASP.NET Core, MongoDB.Driver, JWT Auth
-   **Database:** MongoDB
-   **DevOps:** Docker, Docker Compose

## Getting Started

### Prerequisites

-   Docker & Docker Compose installed
-   Node.js (for local frontend development)

### Local Development

#### 1. Clone the repository

```bash
git clone https://github.com/jorgeborreguero/taskhub.git
cd taskhub
```

#### 2. Start all services with Docker Compose

```bash
docker-compose up --build
```

-   MongoDB will be available on port `27018` (for local tools like Compass)
-   Backend API: `http://localhost:5050/api`
-   Frontend: `http://localhost:5173`

#### 3. Frontend development (optional)

```bash
cd TaskHub.Frontend
npm install
npm run dev
```

#### 4. Backend development (optional)

```bash
cd TaskHub.Api
# Use Visual Studio or run with dotnet CLI
```

## Usage

-   Register and login to access the platform
-   Create, assign, and manage tasks
-   Track time spent on each task and user
-   All data is persisted in MongoDB

## Deployment

-   The project is ready for deployment with Docker Compose
-   You can deploy to any cloud provider supporting Docker (Azure, AWS, GCP, Vercel, etc.)
