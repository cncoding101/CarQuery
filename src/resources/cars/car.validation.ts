import ajvInstance from '@/utils/validator.instance';
import { JSONSchemaType } from 'ajv';

interface Car {
  brand: string;
  color: string;
  model: string;
  engine: string;
  chassi: string;
}

const createSchema: JSONSchemaType<Car> = {
  type: 'object',
  properties: {
    brand: { type: 'string' },
    color: { type: 'string' },
    model: { type: 'string' },
    engine: { type: 'string' },
    chassi: { type: 'string' },
  },
  required: ['brand', 'color', 'model', 'engine', 'chassi'],
  additionalProperties: false,
};

const updateSchema: JSONSchemaType<{}> = {
  type: 'object',
  properties: {
    brand: { type: 'string' },
    color: { type: 'string' },
    model: { type: 'string' },
    engine: { type: 'string' },
    chassi: { type: 'string' },
  },
  additionalProperties: false,
};

const create = ajvInstance.compile(createSchema);
const update = ajvInstance.compile(updateSchema);

export default { create, update };
