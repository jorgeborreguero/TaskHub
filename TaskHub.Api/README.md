# TaskHub Backend

This is the backend for my TaskHub project, built with ASP.NET Core and MongoDB. I developed this API to provide secure, scalable, and modern task management features for the platform.

## Features

-   User authentication with JWT
-   RESTful API for tasks and users
-   Weekly calendar logic
-   Task creation, assignment, status updates
-   Time tracking per user and per task
-   MongoDB integration for persistence
-   Dockerized for easy deployment

## Getting Started

1. Install .NET 9 SDK (or use Visual Studio)
2. Configure MongoDB connection in `appsettings.json`
3. Run the API:
    ```bash
    dotnet run
    ```
4. Or use Docker Compose to start with frontend and database:
    ```bash
    docker-compose up --build
    ```

## Technologies Used

-   ASP.NET Core
-   MongoDB.Driver
-   JWT Authentication
-   Docker
-   C#

## Portfolio Notes

I built this backend to demonstrate my skills in API design, authentication, database integration, and clean architecture (services, repositories, interfaces). Feel free to explore, fork, or use as a template for your own backend projects!
