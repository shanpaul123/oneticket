import './globals.css'
import type { Metadata } from 'next'
import Sidebar from './sidebar/Sidebar'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/600.css'

export const metadata: Metadata = {
  title: 'Inventory App',
  description: 'Add and manage inventory easily.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <div className="flex flex-col md:flex-row">
          <Sidebar />
          <main className="flex-1 p-4 bg-gray-50 md:ml-16">{children}</main>
        </div>
      </body>
    </html>
  )
}
