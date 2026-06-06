import {defineType, defineField} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'


export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      description:
        'Set the Site Title as it should appear in search engine results',
      type: 'string',
      validation: (rule) =>
        rule.max(60).warning('~60 characters is ideal'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      description:
        'Enter the default description that search engine result pages will show by default',
      type: 'text',
      rows: 3,
      validation: (rule) =>
        rule.max(160).warning('~160 characters is ideal'),
    }),
    defineField({
      name: 'shareImage',
      title: 'Social Share Image',
      type: 'image',
      description:
        'Link-preview image when a link to your site is shared on social media (Open Graph / Twitter).',
    }),
    orderRankField({
      type: 'category',
      newItemPosition: 'before',
      hidden: true,
    }),
  ],
});