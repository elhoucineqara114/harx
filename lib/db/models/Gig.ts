import mongoose, { Schema, Model } from 'mongoose';
import type { Gig } from '@/types';

export interface IGig extends Omit<Gig, '_id'> {}

const gigSchema = new Schema<IGig>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    companyId: {
      type: String,
      required: true,
      ref: 'Company',
    },
    requirements: {
      type: [String],
      default: [],
    },
    budget: {
      min: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        default: 'USD',
      },
    },
    duration: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'active', 'in_progress', 'completed', 'cancelled'],
      default: 'draft',
    },
  },
  {
    timestamps: true,
  }
);

gigSchema.index({ companyId: 1, status: 1 });
gigSchema.index({ status: 1, createdAt: -1 });

const GigModel: Model<IGig> = mongoose.models.Gig || mongoose.model<IGig>('Gig', gigSchema);

export default GigModel;
