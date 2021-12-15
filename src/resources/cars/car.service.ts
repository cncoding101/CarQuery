import CarModel from '@/resources/cars/car.model';
import { CarExtended } from '@/resources/cars/car.interface';
import { CarProperties } from '@/resources/cars/car.type';

class CarService {
  private car = CarModel;

  /**
   * Create a new car
   */
  public async create({
    brand,
    color,
    model,
    engine,
    chassi,
  }: CarExtended): Promise<CarExtended> {
    try {
      const car = await this.car.create({
        brand,
        color,
        model,
        engine,
        chassi,
      });

      return car;
    } catch (e) {
      throw new Error('Unable to create a new post');
    }
  }

  public async update(
    id: string,
    keys: string[],
    values: string[]
  ): Promise<void> {
    try {
      if (!id) throw new Error('Please provide an id');

      let properties: CarProperties = {};
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] && values[i]) properties[keys[i]] = values[i];
      }

      if (Object.keys(properties).length === 0)
        throw new Error('Please provide atleast one value to be changed!');

      await this.car.updateOne(
        { _id: id },
        {
          $set: {
            ...properties,
          },
        }
      );
    } catch (e) {
      throw new Error('Unable to create a new post');
    }
  }

  public async fetch(id: string): Promise<CarExtended[]> {
    try {
      let cars: CarExtended[] = [];

      if (id) {
        const car = await this.car.findById(id);

        if (car) cars.push(car);
      } else cars = await this.car.find();

      return cars;
    } catch (e) {
      throw new Error('Unable to create a new post');
    }
  }

  public async remove(id: string): Promise<void> {
    try {
      await this.car.find({ _id: id }).remove();
    } catch (e) {
      throw new Error('Unable to create a new post');
    }
  }
}

export default CarService;
