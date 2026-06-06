import {defineType, defineField} from 'sanity'

export const aboutBlock = defineType({
  name: 'aboutBlock',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text'
        })
      ]
    }),
    defineField({
      name: 'heading',
      type: 'string',
    }),
    defineField({
      name: 'body',
      type: 'blockContent'
    }),
    defineField({
      name: 'imagePosition',
      type: 'string',
      options: {
        list: ['left', 'right'],
        layout: 'radio',
      },
      initialValue: 'left'
    })
  ]
})