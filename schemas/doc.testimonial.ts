import {defineType, defineField} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'


export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      name: 'quote',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'reviewerName',
      title: 'Reviewer Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'reviewerTitle',
      title: 'Reviewer Title',
      type: 'string',
    }),
    defineField({
      name: 'clientName',
      title: 'Client / Company Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'clientUrl',
      title: 'Client Website URL',
      type: 'url',
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt text',
        }),
      ],
      validation: (rule) => rule.required(),
    }),

    orderRankField({
      type: 'category',
      newItemPosition: 'before',
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitle: 'reviewerName',
      media: 'image',
    },
  },
});
