import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'category', 'isBestseller', 'isNew'],
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
        description: 'URL-friendly identifier (e.g., "vanilla-dream-cake")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'shortDescription',
      type: 'text',
      required: true,
      admin: {
        description: 'Brief description for product cards (max 100 chars)',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Price in Rands (ZAR)',
      },
    },
    {
      name: 'originalPrice',
      type: 'number',
      min: 0,
      admin: {
        description: 'Original price if on sale (leave empty if not on sale)',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
      admin: {
        description: 'Additional product images',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      hasMany: false,
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    // Product flags
    {
      type: 'row',
      fields: [
        {
          name: 'isNew',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            width: '33%',
          },
        },
        {
          name: 'isBestseller',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            width: '33%',
          },
        },
        {
          name: 'isFeatured',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            width: '33%',
          },
        },
      ],
    },
    // Product details
    {
      name: 'servings',
      type: 'text',
      admin: {
        description: 'Number of servings (e.g., "10-12")',
      },
    },
    {
      name: 'allergens',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Wheat/Gluten', value: 'wheat' },
        { label: 'Dairy', value: 'dairy' },
        { label: 'Eggs', value: 'eggs' },
        { label: 'Nuts', value: 'nuts' },
        { label: 'Soy', value: 'soy' },
        { label: 'Peanuts', value: 'peanuts' },
      ],
    },
    // Stock management
    {
      name: 'inStock',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'stockQuantity',
      type: 'number',
      min: 0,
      admin: {
        condition: (data) => data?.inStock,
      },
    },
  ],
}
