import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exeption';
import validationMidddleware from '@/middleware//error.middleware';
import validate from '@/resources/post/post.validation';
import PostService from '@/resources/post/post.service';

class PostController implements Controller {
  public paths = ['/cars'];
  public router = Router();

  constructor() {
    this.intialiseRoutes();
  }

  // private intialiseRoutes: void {
  //   this.paths.forEach(path => {
  //     this.router.post(path, validationMidddleware, this.create)
  //   });
  // }

  private async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { title, body } = req.body;

      const post = await this.PostService.create(title, body);

      res.status(201).json({ post });
    } catch (e) {
      next(new HttpException(400, 'Failed to create post'));
    }
  }
}
