import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Sweet Layer Cakery API
        </h1>
        <p className="text-gray-600 mb-8">
          This is the headless CMS backend for Sweet Layer Cakery.
        </p>
        <div className="space-x-4">
          <Link
            href="/admin"
            className="inline-block px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
          >
            Admin Dashboard
          </Link>
          <Link
            href="/api/products"
            className="inline-block px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Products API
          </Link>
        </div>
      </div>
    </main>
  )
}
