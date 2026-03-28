export interface SalaryRange {
  min?: number;
  max?: number;
  currency: string;
  label?: string;
}

export interface WalkInDetails {
  date?: string;
  time?: string;
  venue?: string;
  summary?: string;
}

export interface JobRecord {
  _id: string;
  title: string;
  companyName: string;
  location: {
    city: string;
    country: string;
  };
  jobType: string;
  salaryRange?: SalaryRange;
  experienceRequired: string;
  category: string;
  categoryLabel?: string;
  description: string;
  howToApply: string;
  postedDate: string;
  expiryDate?: string;
  isWalkIn: boolean;
  walkInDetails?: WalkInDetails;
  slug: string;
  status: 'active' | 'expired';
  metaTitle?: string;
  metaDescription?: string;
}

export interface ArticleRecord {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  publishDate: string;
  lastUpdatedDate?: string;
  readTime: number;
  author: string;
  metaTitle?: string;
  metaDescription?: string;
}

export interface CommentRecord {
  _id: string;
  articleSlug: string;
  articleTitle?: string;
  authorName: string;
  message: string;
  submittedAt: string;
  parentCommentId?: string;
  likeCount?: number;
  status: 'pending' | 'approved' | 'rejected';
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface PaginatedResult<T> {
  items: T[];
  pagination: PaginationMeta;
}

export interface JobQueryOptions {
  page?: number;
  limit?: number;
  search?: string;
  country?: string;
  jobType?: string;
  category?: string;
  walkIn?: boolean;
  includeExpired?: boolean;
  sort?: 'recent' | 'walk-in';
}

export interface ArticleQueryOptions {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  status?: 'draft' | 'published' | 'archived';
}
