import { cleanEnv, str, port } from 'envalid';

/**
 * library for validating testing and validating env variables
 */
function validateEnv(): void {
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ['development', 'production'],
    }),
    MONGO_PATH: str(), // enforces the variable to be there
    PORT: port({ default: 3000 }),
  });
}

export default validateEnv;
