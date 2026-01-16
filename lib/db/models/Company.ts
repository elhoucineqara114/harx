import mongoose, { Schema, Model } from 'mongoose';
import type { Company } from '@/types';

export interface ICompany extends Omit<Company, '_id'> {}

const companySchema = new Schema<ICompany>(
  {
    name: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: String,
    website: String,
  },
  {
    timestamps: true,
  }
);

companySchema.index({ name: 1, location: 1 });

const CompanyModel: Model<ICompany> =
  mongoose.models.Company || mongoose.model<ICompany>('Company', companySchema);

export default CompanyModel;
