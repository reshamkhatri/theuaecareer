import mongoose, { Schema, Document, Model } from 'mongoose';
import slugify from 'slugify';

export interface IArticle extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  publishDate: Date;
  scheduledDate?: Date;
  lastUpdatedDate: Date;
  readTime: number;
  author: string;
}

const ArticleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String, default: '' },
    featuredImage: { type: String, default: '' },
    metaTitle: { type: String },
    metaDescription: { type: String },
    category: {
      type: String,
      enum: [
        'Walk-In Interviews',
        'Company Hiring',
        'Career Guides',
        'Salary Insights',
        'Visa Guides',
        'Industry Roundups',
      ],
      default: 'Career Guides',
    },
    tags: [{ type: String, trim: true }],
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    publishDate: { type: Date, default: Date.now },
    scheduledDate: { type: Date },
    lastUpdatedDate: { type: Date, default: Date.now },
    readTime: { type: Number, default: 0 },
    author: { type: String, default: 'Admin' },
  },
  { timestamps: true }
);

// Auto-generate slug and meta
ArticleSchema.pre('save', function () {
  if (!this.slug || this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  // Auto-calculate read time (avg 200 words/min)
  if (this.content) {
    const plainText = this.content.replace(/<[^>]+>/g, '');
    const wordCount = plainText.split(/\s+/).filter(Boolean).length;
    this.readTime = Math.max(1, Math.ceil(wordCount / 200));
  }

  // Auto-generate excerpt
  if (!this.excerpt && this.content) {
    this.excerpt = this.content.replace(/<[^>]+>/g, '').substring(0, 160);
  }

  // Auto-generate meta
  if (!this.metaTitle) {
    this.metaTitle = `${this.title} — theuaecareer.com`;
  }
  if (!this.metaDescription) {
    this.metaDescription = this.excerpt;
  }
});

ArticleSchema.index({ slug: 1 });
ArticleSchema.index({ status: 1, publishDate: -1 });
ArticleSchema.index({ category: 1 });

const Article: Model<IArticle> =
  mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);

export default Article;
