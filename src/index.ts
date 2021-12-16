/**
 * configure environment variables to work
 * adding the alias to paths
 * validation check for env variables
 */
import dotenv from 'dotenv-flow';
import 'module-alias/register';
import validateEnv from './utils/env.validate';
import App from './app';
import CarController from '@/resources/car/car.controller';
import UserController from '@/resources/user/user.controller';

// environmental variables init
dotenv.config();
// make sure the mandatory variables exist
validateEnv();
// intialise the app
const app = new App(
  [new CarController(), new UserController()],
  Number(process.env.PORT)
);

app.listen();
