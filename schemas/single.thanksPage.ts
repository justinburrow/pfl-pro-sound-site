import {defineType, defineField} from 'sanity'

export const thanksPage = defineType({
  name: 'thanksPage',
  type: 'document',
  title: 'Form Submission Thank You Page',
  description: 'Content appearing on the "Thank You" page after a Contact Form submission',
  fields: [
    defineField({
      name: 'heading',
      type: 'string'
    }),

    defineField({
      name: 'copy',
      type: 'string'
    })
  ],
  preview: { prepare: () => ({ title: 'Contact Form Submission "Thanks" Content' }) },
})
