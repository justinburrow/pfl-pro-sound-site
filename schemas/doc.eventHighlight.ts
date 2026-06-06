import { defineType, defineField } from 'sanity';
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'


export const eventHighlight = defineType({
  name: 'eventHighlight',
  title: 'Event Highlight',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
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
  preview: { select: { title: 'title', media: 'image' } },
});