import './globals.css'
import type { Metadata } from 'next'
import Sidebar from './sidebar/Sidebar'
import { Inter } from 'next/font/google';
import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'

export const metadata: Metadata = {
  title: 'Inventory App',
  description: 'Add and manage inventory easily.',
}
// Inside layout.tsx or globals.css
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
       <body className="flex min-h-screen flex-col font-sans antialiased">
    <div className="flex flex-1">
      {/* Sidebar */}
      <aside className="hidden md:block md:w-10 bg-[#1F2937] text-white fixed h-full">
      <Sidebar />

      </aside>
      
      <main className="flex-1 p-4 bg-gray-50 overflow-auto">{children}  </main>
        </div>
      </body>
    </html>
  )
}
