import { defineType, defineField } from 'sanity';
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export const brandPartner = defineType({
  name: 'brandPartner',
  title: 'Brand Partner',
  type: 'document',
  description: 'Logo and Link of a Brand Partner',
  orderings: [orderRankOrdering],

  fields: [
    defineField({
      name: 'brandPartnerName',
      title: 'Brand Partner Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'brandPartnerLink',
      title: 'Brand Partner Link',
      type: 'string',
    }),

    defineField({
      name: 'image',
      title: 'Brand Partner Logo',
      description: 'White logo on transparent background',
      type: 'image',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'logoWidthAdjustment',
      title: 'Logo Width Adjustment',
      description:
        'Set horizontal padding to reduce the width of the logo, in order to match its neighbors',
      type: 'number',
      options: {
        list: [0, 1, 2, 3, 4, 5],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 0,
    }),

    orderRankField({
      type: 'category',
      newItemPosition: 'before',
      hidden: true,
    }),
  ],
  preview: {
    select: { title: 'brandPartnerName', media: 'image' },
  },
});