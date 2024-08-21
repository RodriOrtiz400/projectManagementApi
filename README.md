<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


# Project-Management-API
Api for the Project Management Challenge

## Project setup
```bash
$ npm install
```

## Compile and run the project

```bash
# Run Database
$ docker-compose up
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
## Endpoints

```bash
# Visit
  /swagger
```

## To health-check the project
```bash
# Visit
/api/v1/health-check
```

## To set initial data in DB
```bash
# Visit
/api/v1/set-initial-data
```
