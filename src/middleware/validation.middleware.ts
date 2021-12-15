import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * validate against the schema with options provided from the library ajv
 * @param schema post, get, patch, delete
 * @returns validated entity or errors
 */
function validationMiddleware(validator: any): RequestHandler {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // no await due to nature of ajv works well with single threaded
      const isValid = validator(req.body);
      if (!isValid) {
        const errors = validator.errors; // required to copy the errors
        res.status(400).json(errors);
      }
      next();
    } catch (e) {
      res.status(400).send(e);
    }
  };
}

export default validationMiddleware;
