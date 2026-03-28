import { CommentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const commentType = defineType({
  name: 'comment',
  title: 'Comments',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'articleTitle',
      title: 'Article Title',
      type: 'string',
      readOnly: true,
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: 'articleSlug',
      title: 'Article Slug',
      type: 'string',
      readOnly: true,
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'articlePath',
      title: 'Article Path',
      type: 'string',
      readOnly: true,
      validation: (rule) => rule.required().max(180),
    }),
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      readOnly: true,
      validation: (rule) => rule.required().min(2).max(80),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 6,
      readOnly: true,
      validation: (rule) => rule.required().min(8).max(2000),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending review', value: 'pending' },
          { title: 'Approved', value: 'approved' },
          { title: 'Rejected', value: 'rejected' },
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
      readOnly: true,
    }),
    defineField({
      name: 'moderationNotes',
      title: 'Moderation Notes',
      type: 'text',
      rows: 3,
      description: 'Optional internal notes about why a comment was approved or rejected.',
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'authorName',
      articleTitle: 'articleTitle',
      status: 'status',
      submittedAt: 'submittedAt',
    },
    prepare(selection) {
      const { title, articleTitle, status, submittedAt } = selection;
      const statusLabel = status ? String(status).toUpperCase() : 'PENDING';
      const submittedLabel = submittedAt ? new Date(String(submittedAt)).toLocaleDateString() : '';

      return {
        title: title || 'Anonymous',
        subtitle: [statusLabel, articleTitle, submittedLabel].filter(Boolean).join(' · '),
      };
    },
  },
});
