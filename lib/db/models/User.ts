import mongoose, { Schema, Model } from 'mongoose';
import type { User } from '@/types';

export interface IUser extends Omit<User, '_id'> {
  password: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'rep', 'company', 'user'],
      default: 'user',
    },
    profile: {
      avatar: String,
      bio: String,
      phone: String,
      company: String,
      position: String,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
  }
);

const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default UserModel;
