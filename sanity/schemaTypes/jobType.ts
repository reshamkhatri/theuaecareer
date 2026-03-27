import { defineArrayMember, defineField, defineType } from 'sanity';
import { COUNTRIES, JOB_CATEGORIES, JOB_TYPES } from '@/lib/constants';

export const jobType = defineType({
  name: 'job',
  title: 'Jobs',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: (rule) => rule.required().min(6).max(120),
    }),
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (document) => {
          const location = document?.location as { city?: string } | undefined;
          return [document?.title, document?.companyName, location?.city]
            .filter(Boolean)
            .join(' ');
        },
        maxLength: 120,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        defineField({
          name: 'city',
          title: 'City',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'country',
          title: 'Country',
          type: 'string',
          options: {
            list: COUNTRIES.map((country) => ({ title: country, value: country })),
            layout: 'dropdown',
          },
          initialValue: 'UAE',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'jobType',
      title: 'Job Type',
      type: 'string',
      options: {
        list: JOB_TYPES.map((value) => ({ title: value, value })),
        layout: 'dropdown',
      },
      initialValue: 'Full-time',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: JOB_CATEGORIES.map((value) => ({ title: value, value })),
        layout: 'dropdown',
      },
      initialValue: 'Other',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categoryLabel',
      title: 'Display Category Label',
      type: 'string',
      description: 'Optional broader label like "Retail / FMCG" for front-end display.',
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: 'experienceRequired',
      title: 'Experience Required',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'salaryRange',
      title: 'Salary Range',
      type: 'object',
      fields: [
        defineField({ name: 'min', title: 'Minimum Salary', type: 'number' }),
        defineField({ name: 'max', title: 'Maximum Salary', type: 'number' }),
        defineField({
          name: 'currency',
          title: 'Currency',
          type: 'string',
          initialValue: 'AED',
          validation: (rule) => rule.required().max(10),
        }),
        defineField({
          name: 'label',
          title: 'Display Label',
          type: 'string',
          description: 'Optional custom label like "AED 3,000 - 4,500 + accommodation".',
          validation: (rule) => rule.max(120),
        }),
      ],
      validation: (rule) =>
        rule.custom((value) => {
          if (!value || typeof value !== 'object') {
            return true;
          }

          const record = value as { min?: number; max?: number };
          if (
            typeof record.min === 'number' &&
            typeof record.max === 'number' &&
            record.max < record.min
          ) {
            return 'Maximum salary must be greater than or equal to minimum salary.';
          }

          return true;
        }),
    }),
    defineField({
      name: 'postedDate',
      title: 'Posted Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'expiryDate',
      title: 'Expiry Date',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Expired', value: 'expired' },
        ],
        layout: 'radio',
      },
      initialValue: 'active',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isWalkIn',
      title: 'Walk-in Interview?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'walkInDetails',
      title: 'Walk-in Details',
      type: 'object',
      hidden: ({ document }) => !document?.isWalkIn,
      fields: [
        defineField({ name: 'date', title: 'Date', type: 'datetime' }),
        defineField({ name: 'time', title: 'Time', type: 'string' }),
        defineField({ name: 'venue', title: 'Venue', type: 'string' }),
        defineField({
          name: 'summary',
          title: 'Summary',
          type: 'string',
          description: 'Optional one-line display summary used on listing cards.',
        }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Job Description',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'howToApply',
      title: 'How To Apply',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(170),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      companyName: 'companyName',
      city: 'location.city',
    },
    prepare(selection) {
      const { title, companyName, city } = selection;
      return {
        title,
        subtitle: [companyName, city].filter(Boolean).join(' · '),
      };
    },
  },
});
