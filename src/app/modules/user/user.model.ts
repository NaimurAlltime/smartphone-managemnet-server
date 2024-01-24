import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import config from '../../config';
import { prevPassword, TUser, UserModel } from './user.interface';

const passwordHistorySchema = new Schema<prevPassword, UserModel>(
  {
    password: {
      type: String,
    },
    createdAt: {
      type: String,
    },
  },
  {
    _id: false,
  },
);

const userSchema = new Schema<TUser, UserModel>(
  {
    username: {
      type: String,
      required: [true, 'User Name is required!'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required!'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
      select: 0,
    },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    passwordChangeHistory: {
      type: [passwordHistorySchema],
      select: 0,
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

//! pre save middleware/hook || hashing password
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

//! post save middleware/hook
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByCustomUsername = async function (
  username: string,
) {
  return await this.findOne({ username }).select(
    '+password +passwordChangeHistory',
  );
};

userSchema.statics.isPasswordMatched = async function (
  plainPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);
