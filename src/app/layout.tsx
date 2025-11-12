import type { Metadata } from 'next'
import './globals.css'
import FontLoader from '@/components/FontLoader'

export const metadata: Metadata = {
  title: 'Monlam Font Viewer',
  description: 'Preview and compare Monlam Tibetan fonts with beautiful typography',
  icons: {
    icon: 'monlam_logo.png',
    shortcut: 'monlam_logo.png',
    apple: 'monlam_logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <FontLoader />
        {children}
      </body>
    </html>
  )
}