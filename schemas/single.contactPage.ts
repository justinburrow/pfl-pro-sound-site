import {defineType, defineField, defineArrayMember} from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'formId',
      title: 'Formspark Form ID',
      type: 'string',
      description: 'Enter the Contact Form ID - found in the admin of the Formspark.io account'
    })
  ],
  preview: { prepare: () => ({ title: 'Contact Page' }) },
})