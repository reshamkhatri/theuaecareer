import mongoose, { Schema, Document, Model } from 'mongoose';
import slugify from 'slugify';

export interface IJob extends Document {
  title: string;
  companyName: string;
  location: {
    city: string;
    country: 'UAE' | 'Saudi Arabia' | 'Qatar';
  };
  jobType: 'Full-time' | 'Part-time' | 'Walk-in' | 'Contract';
  salaryRange?: {
    min?: number;
    max?: number;
    currency: string;
  };
  experienceRequired: string;
  category: string;
  description: string;
  howToApply: string;
  postedDate: Date;
  expiryDate: Date;
  isWalkIn: boolean;
  walkInDetails?: {
    date: Date;
    time: string;
    venue: string;
  };
  slug: string;
  status: 'active' | 'expired';
  metaTitle: string;
  metaDescription: string;
}

const JobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true, trim: true },
    companyName: { type: String, trim: true, default: '' },
    location: {
      city: { type: String, required: true, trim: true },
      country: {
        type: String,
        enum: ['UAE', 'Saudi Arabia', 'Qatar'],
        default: 'UAE',
      },
    },
    jobType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Walk-in', 'Contract'],
      default: 'Full-time',
    },
    salaryRange: {
      min: { type: Number },
      max: { type: Number },
      currency: { type: String, default: 'AED' },
    },
    experienceRequired: { type: String, default: '' },
    category: {
      type: String,
      enum: [
        'Hospitality',
        'IT',
        'Construction',
        'Healthcare',
        'Sales',
        'Logistics',
        'Admin',
        'Finance',
        'Education',
        'Engineering',
        'Retail',
        'Other',
      ],
      default: 'Other',
    },
    description: { type: String, required: true },
    howToApply: { type: String, required: true },
    postedDate: { type: Date, default: Date.now },
    expiryDate: { type: Date, required: true },
    isWalkIn: { type: Boolean, default: false },
    walkInDetails: {
      date: { type: Date },
      time: { type: String },
      venue: { type: String },
    },
    slug: { type: String, unique: true },
    status: {
      type: String,
      enum: ['active', 'expired'],
      default: 'active',
    },
    metaTitle: { type: String },
    metaDescription: { type: String },
  },
  { timestamps: true }
);

// Auto-generate slug before saving
JobSchema.pre('save', function () {
  if (!this.slug || this.isModified('title') || this.isModified('companyName')) {
    const base = `${this.title}-${this.companyName}-${this.location.city}`.toLowerCase();
    this.slug = slugify(base, { lower: true, strict: true }) + '-' + Date.now().toString(36);
  }

  // Auto-generate meta title & description
  if (!this.metaTitle) {
    this.metaTitle = `${this.title} in ${this.location.city} — theuaecareer.com`;
  }
  if (!this.metaDescription) {
    this.metaDescription = this.description.replace(/<[^>]+>/g, '').substring(0, 155);
  }
});

// Auto-expire old jobs
JobSchema.index({ expiryDate: 1 });
JobSchema.index({ slug: 1 });
JobSchema.index({ status: 1, postedDate: -1 });
JobSchema.index({ isWalkIn: 1, 'walkInDetails.date': 1 });

const Job: Model<IJob> = mongoose.models.Job || mongoose.model<IJob>('Job', JobSchema);

export default Job;
