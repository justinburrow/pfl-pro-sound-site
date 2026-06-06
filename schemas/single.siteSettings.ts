import {defineType, defineField, defineArrayMember} from 'sanity'
import { accentColorOptions } from './lib.accentColors';
import { AccentColorInput } from './components/AccentColorInput';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
    }),

    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'array',
      of: [
        {
          name: 'logoObj',
          type: 'object',
          fields: [
            {
              name: 'logoImage',
              title: 'Logo Image',
              type: 'image',
              description:
                'White/light text on transparent background for best results',
            },
            {
              name: 'logoAlt',
              type: 'string',
              title: 'Alt Text',
              description:
                'Alt Text for the main site logo image - high SEO value',
            },
          ],
        },
      ],
    }),

    defineField({
      name: 'accentColor',
      title: 'Accent Color',
      type: 'string',
      description:
        'Choose the secondary accent color used in subheadings and underlines',
      options: {
        list: accentColorOptions,
      },
      components: {
        input: AccentColorInput,
      },
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'copyright',
      title: 'Copyright Entity',
      type: 'string',
      description:
        'e.g. "PFL Pro Sound, LLC" — the year is added automatically at render.',
    }),

    defineField({
      name: 'seo',
      title: 'Default SEO',
      type: 'seo',
    }),

    defineField({
      name: 'social',
      title: 'Social Links',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'socialLink',
          type: 'object',

          fields: [
            defineField({
              name: 'platform',
              title: 'Social Media Platform',
              description: '(e.g. Facebook, X, Instagram)',
              type: 'string',
            }),

            defineField({
              name: 'url',
              title: 'Account URL',
              description:
                'Include the full https:// address to the profile for your account',
              type: 'url',
            }),
          ],
        }),
      ],
    }),
  ],
});