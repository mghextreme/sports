# Sports Tournament

First of all, create a copy of `.env.example` file in the root folder and name it `.env`.

## Database

To have a database instance, ensure you have Docker installed and start the Docker Compose file using the following command:

```bash
docker compose up -d
```

## API

To start the API, run the following command within the `/api` folder:

```bash
npm start
```

* Requires [database](#database) to be setup

> Alternatively, you can run the API Mock from the `api-mock` folder, which doesn't require database setup

## App

To start the Angular application, run the following command within the `/app` folder:

```bash
npm start
```

* Requires the [API](#api) to be setup
