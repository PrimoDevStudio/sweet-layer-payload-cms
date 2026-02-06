import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sweet Layer Cakery API',
  description: 'Delicious custom cakes for every occasion',
}

/* Root layout passes children through - Payload handles its own html/body */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
