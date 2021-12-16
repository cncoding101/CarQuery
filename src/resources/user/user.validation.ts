import { JSONSchemaType } from 'ajv';
import ajvInstance from '@/utils/validator.instance';

interface User {
  email: string;
  password: string;
}

const registerSchema: JSONSchemaType<User> = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', format: 'password' },
  },
  required: ['email', 'password'],
  additionalProperties: false,
}; // TODO extend to login..

const register = ajvInstance.compile(registerSchema);

export default { register };
