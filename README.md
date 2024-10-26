# Notes GraphQL App

This project is a Next.js-based GraphQL application using PostgreSQL as the database. Docker Compose is used to manage services and simplify setup. Follow these instructions to set up and run the app in a Docker environment.

## Prerequisites

Ensure you have the following installed on your system:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

1. **Clone the Repository**

   ```bash
   git clone https://github.com/depermana12/next-notes-gql.git

   cd next-notes-gql
   ```

2. **Setup environment variables**

Create a .env file in the root directory (if it doesn't exist) and populate it with your configuration. An example configuration is:

```
DB_PASS=nextgql
DB_USER=postgres
DB_NAME=gqlnotes
DB_HOST=db          # Use the Docker service name here
DB_PORT=5432
```

This configuration allows Docker containers to connect to each other using service names.

3. **Build and start services**

Use Docker compose to build and start the services:

```
docker-compose up --build
```

```
docker-compose up --build -d
```

```
--build flag: built firstime or rebuilt if there are changes in the Dockerfile.
-d flag: to run the services in detached mode.
```

Once the services are running, the app should be accessible at http://localhost:3000.

## Migrate database table

After the containers are up, you need to push the schema in drizzle ORM to PostgreSQL. You can do this by access a shell inside a the web running container using the following command:

1. **Check the name/sha of the running process**

```
docker ps
```

2. **Access shell inside web container**

```
docker exec -it <container_name> /bin/bash
```

3. **Push schema to db by running**

```
npm run push:db
```

## Access the postgres container

1.  **To connect to the PostgreSQL database using psql:**

```
docker compose exec -it db psql -U postgres -d gqlnotes
```

2. **Check table after migration**

```
\d
```

you can running the sql here

## Starting and Stopping Containers

- To start and rebuild services: `docker compose up --build`
- To start services after rebuild: `dokcer compose up`
- To start services in detached mode, add flag: `-d`

## Testing the GraphQL API

You can interact with the GraphQL API directly to test different queries and mutations by visiting the Apollo Server at: http://localhost:3000/api/graphql

## Tech Stack

- Frontend: Next.js, React, Urql, Shadcn UI, Tailwind CSS
- Backend: Node.js, GraphQL, Drizzle ORM, PostgreSQL, Apollo Server
- Authentication: JSON Web Token (JWT)
- State Management: React Context

## License

This project is licensed under the MIT License.

This `README.md` provides instructions to clone, set up, and run the application with Docker, including pushing the database schema after starting the services. Adjust repository details, URLs, and any other project-specific values as needed.
