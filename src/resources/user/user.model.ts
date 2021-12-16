import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import User from '@/resources/user/user.interface';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true, // get rid of whitespaces
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre<User>('save', async function (next) {
  if (!this.isModified('password')) {
    return next(); // TODO patch user..
  }

  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;

  return next();
});

UserSchema.methods.isValidPassword = async function (
  password: string
): Promise<Error | boolean> {
  const saltedPassword = await bcrypt.compare(password, this.password);

  return saltedPassword;
};

export default model<User>('User', UserSchema);
