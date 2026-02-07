import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Products } from './collections/Products'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { Orders } from './collections/Orders'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' - Sweet Layer Cakery',
    },
  },
  collections: [
    Categories,
    Products,
    Media,
    Users,
    Orders,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-change-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        },
      },
      bucket: process.env.S3_BUCKET || 'recorded-shoebox-9w-7j7kg',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || 'auto',
        endpoint: process.env.S3_ENDPOINT || 'https://t3.storageapi.dev',
        forcePathStyle: true,
      },
    }),
  ],
  cors: [
    'http://localhost:3000',
    'http://localhost:8000',
    'https://shop.primodevstudio.com',
  ],
  csrf: [
    'http://localhost:3000',
    'http://localhost:8000',
    'https://shop.primodevstudio.com',
  ],
})
