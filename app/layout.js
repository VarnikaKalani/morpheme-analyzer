import './globals.css'

export const metadata = {
  title: 'Interactive Morpheme Analyzer',
  description: 'Learn morphology through interactive word analysis',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
