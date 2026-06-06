import {defineField} from 'sanity'

export const hiddenField = defineField({
  name: 'hidden',
  title: 'Hide this section',
  description: 'Tick to prevent this section from rendering on the live site.',
  type: 'boolean',
  initialValue: false,
})