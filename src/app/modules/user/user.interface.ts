import { Model } from 'mongoose';

export interface prevPassword {
  password: string;
  createdAt: string;
}

export interface TUser {
  _id?: string;
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  passwordChangeHistory: prevPassword[];
}

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomUsername(username: string): Promise<TUser | null>;
  isPasswordMatched(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
