import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exeption';
import validationMidddleware from '@/middleware/validation.middleware';
import validate from '@/resources/car/car.validation';
import CarService from '@/resources/car/car.service';
import authenticated from '@/middleware/authenticated.middleware';

class CarController implements Controller {
  public path = '/cars';
  public router = Router();
  private CarService = new CarService();

  constructor() {
    this.intialiseRoutes();
  }

  private intialiseRoutes(): void {
    // create
    this.router.post(
      this.path,
      authenticated,
      validationMidddleware(validate.create),
      this.create
    );

    // patch
    this.router.patch(
      `${this.path}/:id`,
      authenticated,
      validationMidddleware(validate.update),
      this.update
    );

    // get
    this.router.get(`${this.path}`, authenticated, this.fetch);
    this.router.get(`${this.path}/:id`, authenticated, this.fetch);

    // delete
    this.router.delete(`${this.path}/:id`, this.remove);
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const car = await this.CarService.create(req.body);

      res.status(201).json({ car });
    } catch (e) {
      next(new HttpException(400, e.message));
    }
  };

  private update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      await this.CarService.update(
        id,
        Object.keys(req.body),
        Object.values(req.body)
      );

      res.status(204).send();
    } catch (e) {
      next(new HttpException(400, e.message));
    }
  };

  private fetch = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const cars = await this.CarService.fetch(id);

      res.status(200).json({ cars });
    } catch (e) {
      next(new HttpException(400, e.message));
    }
  };

  private remove = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      await this.CarService.remove(id);

      res.status(204).send();
    } catch (e) {
      next(new HttpException(400, e.message));
    }
  };
}

export default CarController;
