import jwt from 'jsonwebtoken';
import User from '@/resources/user/user.interface';
import Token from '@/utils/interfaces/token.interface';

const createToken = (user: User): string =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET as jwt.Secret, {
    expiresIn: '1d',
  });

const verifyToken = async (token: string): Promise<jwt.VerifyErrors | Token> =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET as jwt.Secret, (err, payload) => {
      if (err) return reject(err);

      return resolve(payload as Token);
    });
  });

export default { createToken, verifyToken };
