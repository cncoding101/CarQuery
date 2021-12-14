/**
 * configure environment variables to work
 * adding the alias to paths
 * validation check for env variables
 */
import 'dotenv';
import 'module-alias/register';
import validateEnv from './utils/env.validate';
import App from './app';

validateEnv();
// intialise the app
const app = new App([], Number(process.env.PORT));

app.listen();
