import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Temporary Mail Generator',
  description: 'Welcome to Temporary Mail Generator, the ultimate online destination for individuals who value their privacy and seek convenient email solutions. Our innovative platform allows you to generate temporary email addresses effortlessly, providing you with a secure and reliable way to communicate without compromising your personal information.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}
      <Toaster />
      </body>
    </html>
  )
}
