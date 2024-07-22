import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import React from 'react'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'Journal App',
   description: 'Journal application made by MaxBodin.',
}

export default function RootLayout({
                                      children,
                                   }: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
         defaultTheme="system"
         enableSystem
         disableTransitionOnChange
         themes={['dark', 'light', 'system']}
      >
         {children}
      </ThemeProvider>
      <Toaster />
      </body>
      </html>
   )
}