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
      <link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
/>

      <body className="flex min-h-screen flex-col font-sans antialiased">
        <div className="flex flex-1">
          <aside className="hidden md:block md:w-10 bg-[#1F2937] text-white fixed h-full">
            <Sidebar />
          </aside>
          <main className="flex-1 p-4 bg-gray-50 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  )
}
