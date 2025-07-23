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
    <html lang="en" className="h-full">
      <body className="h-full overflow-hidden font-sans antialiased">
        <div className="flex h-full">
          {/* Sidebar (fixed width) */}
          <Sidebar />

          {/* Main content scrollable */}
          <main className="flex-1 overflow-auto p-4 bg-gray-50">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
