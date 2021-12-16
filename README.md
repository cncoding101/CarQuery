# Cars-Query

Simple REST Api for cars.

## Description

This is a REST api developed for car queries. You can interact with the api by using a third party application such as postman. In the repo you can find a collection attached. The application has a simple CRUD operations to handle and manipulate a car. The resources are protected by a simple JWT api key. The application is also dockerized. You can find the docker compose file in the repo. Using the docker-compose it can all be containerized. The solution is using eslint to enforce a code style and prettier for formatting. Husky is added in so that commits are clean as well as proper. To handle the database, I suggest to use mongocompass.

## Getting Started

Start by creating a user using any third party application to make http requests to the server. Once a user has been created a token will be sent back in the response body. You can use this token to access the resources of a car.

### Dependencies

For containerized solution

- Docker

For developing

- Node
- VS code
- Eslint
- Prettier

### Installing

This part is only if you decide to not use the docker-compose file.

- yarn install

### Executing program

Containerized solution

- docker-compose up -d in any docker supported terminal
- docker-compose down (when you want to end the application)

In none containerized solution

- open the solution folder
- containerize mongodb by running docker-compose up -d mongodb
- yarn run dev
- CTRL + C to end the application

### Test

No test currently..

## Authors

Contributors names and contact info

Developer: Christofer Nguyen
Github: https://github.com/cncoding101

## Version History

- 1.0

## License

MIT
