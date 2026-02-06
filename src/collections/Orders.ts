import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'customerEmail', 'status', 'total', 'createdAt'],
  },
  access: {
    read: () => true, // Will add proper auth later
    create: () => true,
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Processing', value: 'processing' },
        { label: 'Ready for Pickup', value: 'ready' },
        { label: 'Out for Delivery', value: 'delivering' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
    },
    // Customer info
    {
      name: 'customerName',
      type: 'text',
      required: true,
    },
    {
      name: 'customerEmail',
      type: 'email',
      required: true,
    },
    {
      name: 'customerPhone',
      type: 'text',
      required: true,
    },
    // Delivery info
    {
      name: 'deliveryMethod',
      type: 'select',
      required: true,
      options: [
        { label: 'Pickup', value: 'pickup' },
        { label: 'Delivery', value: 'delivery' },
      ],
    },
    {
      name: 'deliveryAddress',
      type: 'textarea',
      admin: {
        condition: (data) => data?.deliveryMethod === 'delivery',
      },
    },
    {
      name: 'pickupStore',
      type: 'text',
      admin: {
        condition: (data) => data?.deliveryMethod === 'pickup',
      },
    },
    {
      name: 'deliveryDate',
      type: 'date',
      required: true,
    },
    {
      name: 'deliveryTime',
      type: 'text',
      admin: {
        description: 'Preferred time slot (e.g., "10:00 - 12:00")',
      },
    },
    // Order items
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'productName',
          type: 'text',
          required: true,
          admin: {
            description: 'Stored at time of order in case product changes',
          },
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          min: 1,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          admin: {
            description: 'Price per item at time of order',
          },
        },
        {
          name: 'customization',
          type: 'text',
          admin: {
            description: 'Custom message or special request',
          },
        },
      ],
    },
    // Totals
    {
      name: 'subtotal',
      type: 'number',
      required: true,
    },
    {
      name: 'deliveryFee',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'total',
      type: 'number',
      required: true,
    },
    // Notes
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes about the order',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Generate order number on create
        if (operation === 'create' && !data.orderNumber) {
          const timestamp = Date.now().toString(36).toUpperCase()
          const random = Math.random().toString(36).substring(2, 6).toUpperCase()
          data.orderNumber = `SLC-${timestamp}-${random}`
        }
        return data
      },
    ],
  },
}
