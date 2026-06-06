import {defineType, defineField, defineArrayMember} from 'sanity'
import {hiddenField} from './lib.sectionFields'
type SectionMember = { _type: string };

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      description:
        'Headline to render with the Hero Slider as raw text.  Keep all text lowercase to adhere to the design.',
      type: 'string',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'servicesImage',
      type: 'image',
      title: 'Services Image',
      description: 'Image appearing next to the Services list',
      validation: (r) => r.required(),
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Image Alt Text',
        }),
      ],
    }),

    defineField({
      name: 'sections',
      title: 'Page sections',
      description:
        'Drag to reorder the middle content of the page. Hero Slider and Client Logos are not affected by the settings of this list.',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'gallerySection',
          title: 'Event Highlight Gallery',
          type: 'object',
          fields: [hiddenField],
          preview: {
            select: { hidden: 'hidden' },
            prepare: ({ hidden }) => ({
              title: 'Event Highlight Gallery',
              subtitle: hidden ? 'Hidden' : 'Visible',
            }),
          },
        }),

        defineArrayMember({
          name: 'testimonialsSection',
          title: 'Testimonials',
          type: 'object',
          fields: [hiddenField],
          preview: {
            select: { hidden: 'hidden' },
            prepare: ({ hidden }) => ({
              title: 'Testimonials',
              subtitle: hidden ? 'Hidden' : 'Visible',
            }),
          },
        }),

        defineArrayMember({
          name: 'servicesSection',
          title: 'Services',
          type: 'object',
          fields: [
            hiddenField,
            defineField({
              name: 'services',
              type: 'array',
              of: [defineArrayMember({ type: 'service' })],
              validation: (r) => r.min(1),
            }),
          ],
          preview: {
            select: { hidden: 'hidden', services: 'services' },
            prepare: ({ hidden, services }) => ({
              title: 'Services',
              subtitle: `${services?.length ?? 0} service(s) ${hidden ? 'hidden' : 'visible'}`,
            }),
          },
        }),

        defineArrayMember({ type: 'imageText' }),
      ],
      validation: (rule) =>
        rule.custom<SectionMember[]>((sections) => {
          const singletonTypes = [
            'gallerySection',
            'testimonialsSection',
            'servicesSection',
          ];
          const counts = (sections ?? []).reduce<
            Record<string, number>
          >((acc, s) => {
            acc[s._type] = (acc[s._type] ?? 0) + 1;
            return acc;
          }, {});
          const dupes = singletonTypes.filter(
            (t) => (counts[t] ?? 0) > 1,
          );
          return dupes.length
            ? `Only one of each allowed: ${dupes.join(', ')}`
            : true;
        }),
    }),
  ],
  preview: { prepare: () => ({ title: 'Home Page' }) },
});
