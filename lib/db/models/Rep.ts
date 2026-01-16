import mongoose, { Schema, Model } from 'mongoose';
import type { Rep } from '@/types';

export interface IRep extends Omit<Rep, '_id'> {}

const repSchema = new Schema<IRep>(
  {
    userId: {
      type: String,
      required: true,
      ref: 'User',
    },
    skills: {
      type: [String],
      default: [],
    },
    experience: {
      type: Number,
      default: 0,
    },
    availability: {
      type: String,
      enum: ['available', 'busy', 'unavailable'],
      default: 'available',
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    completedGigs: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

repSchema.index({ userId: 1 });
repSchema.index({ availability: 1, rating: -1 });

const RepModel: Model<IRep> = mongoose.models.Rep || mongoose.model<IRep>('Rep', repSchema);

export default RepModel;
