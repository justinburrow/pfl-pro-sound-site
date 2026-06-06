import { hiddenField } from './lib.sectionFields';
import { defineField, defineType } from 'sanity';
// fields: [hiddenField, image, heading, body, imagePosition]
// preview: title: heading || 'Image + text', subtitle: hidden ? 'Hidden' : 'Visible'

export const imageText = defineType({
  name: 'imageText',
  title: 'Image Text',
  type: 'object',
  fields: [hiddenField],
  preview: {
    select: { heading: 'heading', media: 'image', hidden: 'hidden' },
    prepare: ({ heading, media, hidden }) => ({
      title: heading || 'Image + Text',
      subtitle: hidden ? 'Hidden' : 'Visible',
      media,
    }),
  },
});
