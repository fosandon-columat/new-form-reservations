import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// next/font optimiza la carga de Inter (self-hosting, sin layout shift) y la
// expone como variable CSS que consume el token --font-sans de Tailwind.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Columat · Locker reservation',
  description: 'Public locker reservation form — Orders and Storage',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
