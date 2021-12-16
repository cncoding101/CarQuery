import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '@/resources/user/user.model';
import Token from '@/utils/interfaces/token.interface';
import HttpException from '@/utils/exceptions/http.exeption';
import token from '@/utils/token';

async function authenticatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer '))
    return next(new HttpException(401, 'Unauthorized'));

  const accessToken = bearer.split('Bearer ')[1].trim();

  try {
    const payload: Token | jwt.JsonWebTokenError = await token.verifyToken(
      accessToken
    );

    if (payload instanceof jwt.JsonWebTokenError)
      return next(new HttpException(401, 'Unauthorized'));

    console.log('what is payload', payload);

    const user = await UserModel.findById(payload.id)
      .select('-password')
      .exec(); // removes the password from user entity

    console.log('what is user', { user });

    if (!user) return next(new HttpException(401, 'Unauthorized'));

    req.user = user;

    return next();
  } catch (error) {
    return next(new HttpException(401, 'Unauthorized'));
  }
}

export default authenticatedMiddleware;
