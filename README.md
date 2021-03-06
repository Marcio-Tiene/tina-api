# Tina-API

<a href="#" ><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>

## Description

It's an api to proivide services to [Tina]()'s app

## How to create a postgres container to tina api

1. Make sure you have [Docker](https://www.docker.com/get-started) installed.
2. On `.env` file add the  `POSTGRES_DB`, `POSTGRES_DATA_DIR`, `POSTGRES_USER`  and `POSTGRES_PASSWORD` like the `.env.sample`.
3. If it's the first time you run this container you'll need to run

  ```bash
  #create netework first 
  ./create-network.sh 

  ```

4. To start the container.

  ```bash
  #start container
  ./db-up.sh
  ```

5. To stop the container.

  ```bash
  #stop container
  timodb-down.sh
  ```

## Installation

```bash
#install dependencies
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Support



## Stay in touch

- Author - [Marcio Tiene](https://github.com/Marcio-Tiene)
- App - [https://tobedefined.com]()
- Instagram - [@tobedefined]()

## License

This project is [MIT licensed](LICENSE).
