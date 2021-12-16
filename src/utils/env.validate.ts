import { cleanEnv, str, port } from 'envalid';

/**
 * library for validating testing and validating env variables
 */
function validateEnv(): void {
  cleanEnv(process.env, {
    MONGO_USER: str(),
    MONGO_PASSWORD: str(),
    MONGO_PORT: str(),
    DATABASE: str(),
    PORT: port({ default: 3000 }),
    JWT_SECRET: str(),
  });
}

export default validateEnv;
