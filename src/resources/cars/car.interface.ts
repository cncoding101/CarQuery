import { Document } from 'mongoose';

interface CarExtended extends Document {
  brand: string;
  color: string;
  model: string;
  engine: string;
  chassi: string;
}

interface Car {
  brand: string;
  color: string;
  model: string;
  engine: string;
  chassi: string;
}

export { Car, CarExtended };
