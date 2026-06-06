import {defineType, defineField, defineArrayMember} from 'sanity'
import { aboutBlock } from './obj.aboutBlock'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'headingAccent',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'headingCopy',
      type: 'string',
    }),
    defineField({
      name: 'introBlock',
      type: 'aboutBlock',
    }),
    defineField({
      name: 'ownerBlock',
      type: 'aboutBlock',
      initialValue: { imagePosition: 'right' },
    }),
  ],
  preview: { prepare: () => ({ title: 'About Page' }) },
});
