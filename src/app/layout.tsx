import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import FontLoader from '@/components/FontLoader'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Monlam Font Viewer',
  description: 'Preview and compare Monlam Tibetan fonts with beautiful typography',
  icons: {
    icon: '/monlam_logo.png',
    shortcut: '/monlam_logo.png',
    apple: '/monlam_logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FontLoader />
        {children}
      </body>
    </html>
  )
}