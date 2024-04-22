import { Model } from 'mongoose';

export type TUserRoles = 'super-admin' | 'branch-manager' | 'seller';

export type TUser = {
  fullName: string;
  username: string;
  role: TUserRoles;
  email: string;
  password: string;
  profileImage?: string;
};

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomUsername(username: string): Promise<TUser | null>;
  isPasswordMatched(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
