import {defineType, defineField} from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'description', type: 'text', rows: 3, validation: (r) => r.required()}),
  ],
  preview: {select: {title: 'title', subtitle: 'description'}},
})