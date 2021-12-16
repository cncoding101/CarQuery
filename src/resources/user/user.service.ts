import UserModel from '@/resources/user/user.model';
import token from '@/utils/token';

class UserService {
  private user = UserModel;

  /**
   * Register a new user..
   */
  public async register({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<string | Error> {
    try {
      const user = await this.user.create({ email, password });

      const accessToken = token.createToken(user);

      return accessToken;
    } catch (error) {
      throw new Error('Unable to register user!');
    }
  }

  /**
   * Login user
   */
  public async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<string | Error> {
    try {
      const user = await this.user.findOne({ email });

      if (!user) throw new Error('User do not exist!');

      if (await user.isValidPassword(password)) return token.createToken(user);

      throw new Error('Incorrect credentials!');
    } catch (error) {
      throw new Error('Unable to register user!');
    }
  }
}

export default UserService;
