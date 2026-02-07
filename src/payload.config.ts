import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Categories } from './collections/Categories'
import { Products } from './collections/Products'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { Orders } from './collections/Orders'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Only configure email adapter if SMTP credentials are provided
const emailAdapter = process.env.SMTP_USER && process.env.SMTP_PASS
  ? nodemailerAdapter({
      defaultFromAddress: process.env.SMTP_FROM || 'noreply@sweetlayer.co.za',
      defaultFromName: 'Sweet Layer Cakery',
      transportOptions: {
        host: process.env.SMTP_HOST || 'smtp.resend.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
    })
  : undefined

export default buildConfig({
  sharp,
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  ...(emailAdapter && { email: emailAdapter }),
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
