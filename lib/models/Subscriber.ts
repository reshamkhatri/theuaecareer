import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ISubscriber extends Document {
  email: string;
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriberSchema = new Schema<ISubscriber>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    source: {
      type: String,
      default: 'site',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

SubscriberSchema.index({ email: 1 }, { unique: true });

const Subscriber: Model<ISubscriber> =
  mongoose.models.Subscriber || mongoose.model<ISubscriber>('Subscriber', SubscriberSchema);

export default Subscriber;
