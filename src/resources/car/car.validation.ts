import { JSONSchemaType } from 'ajv';
import ajvInstance from '@/utils/validator.instance';
import CarProperties from '@/resources/car/car.type';

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

const updateSchema: JSONSchemaType<CarProperties> = {
  type: 'object',
  properties: {
    brand: { type: 'string' },
    color: { type: 'string' },
    model: { type: 'string' },
    engine: { type: 'string' },
    chassi: { type: 'string' },
  },
  required: [],
  additionalProperties: false,
};

const create = ajvInstance.compile(createSchema);
const update = ajvInstance.compile(updateSchema);

export default { create, update };
