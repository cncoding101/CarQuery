import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi from 'joi';

/**
 * validate against the schema with options provided from the library joi
 * @param schema post, get, patch, delete
 * @returns validated entity or errors
 */
function validationMiddleware(schema: Joi.Schema): RequestHandler {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const validationOptions = {
      abortEarly: false, // enables so that we can gather all the potential errors by not stopping at first error
      allowUnknown: true, // allows values outside of the schema
      stripUnknown: true, // this will get rid of the properties that do not belong to the schema
    };

    try {
      const value = await schema.validateAsync(req.body, validationOptions);
      req.body = value; // the approved values
      next();
    } catch (e) {
      const errors: string[] = [];
      e.details.forEach((error: Joi.ValidationErrorItem) => {
        errors.push(error.message);
      });
      res.status(400).send({ errors });
    }
  };
}

export default validationMiddleware;