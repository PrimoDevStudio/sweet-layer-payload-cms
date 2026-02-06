import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'color'],
  },
  access: {
    read: () => true, // Public read access
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier (e.g., "signature-cakes")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'color',
      type: 'text',
      required: true,
      defaultValue: '#d4a5a5',
      admin: {
        description: 'Hex color for UI theming (e.g., #d4a5a5)',
      },
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Emoji icon for the category (e.g., 🎂)',
      },
    },
  ],
}
