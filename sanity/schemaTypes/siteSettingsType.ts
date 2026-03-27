import { defineField, defineType } from 'sanity';

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      initialValue: 'theuaecareer.com',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'siteTagline',
      title: 'Site Tagline',
      type: 'string',
      initialValue: 'Your Gateway to Gulf Careers',
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.max(220),
    }),
    defineField({
      name: 'homeHeroTitle',
      title: 'Homepage Hero Title',
      type: 'string',
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: 'homeHeroSubtitle',
      title: 'Homepage Hero Subtitle',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.max(240),
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'metaTitle',
      title: 'Default Meta Title',
      type: 'string',
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Default Meta Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(170),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'Homepage and shared SEO content',
      };
    },
  },
});
