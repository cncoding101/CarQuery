import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exeption';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/user/user.validation';
import UserService from './user.service';

class Usercontroller implements Controller {
  public path = '/users';
  public router = Router();
  private UserService = new UserService();

  constructor() {
    this.intialiseRoutes();
  }

  private intialiseRoutes(): void {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(validate.register),
      this.register
    );

    // authenticate routes
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(validate.register),
      this.login
    );
  }

  private register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = await this.UserService.register(req.body);

      res.status(201).json({ token });
    } catch (error) {
      next(new HttpException(400, error.messages));
    }
  };

  private login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = await this.UserService.login(req.body);

      res.status(200).json({ token });
    } catch (error) {
      next(new HttpException(400, error.messages));
    }
  };
}

export default Usercontroller;
