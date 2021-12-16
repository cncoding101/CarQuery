import User from '@/resources/user/user.interface';

/**
 * Adds the user to express interface
 */
declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}
