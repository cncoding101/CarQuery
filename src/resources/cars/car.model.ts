import { Schema, model } from 'mongoose';
import { CarExtended } from '@/resources/cars/car.interface';

/**
 * Defines a post schema for the controller
 * with a timestamp
 */
const CarSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    engine: {
      type: String,
      required: true,
    },
    chassi: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<CarExtended>('Car', CarSchema);
