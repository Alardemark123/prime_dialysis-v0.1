import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
// import { BranchProvider } from '@/context/BranchContext'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata = {
  title: 'Prime Dialysis Center Inc - Advanced Dialysis Solutions',
  description: 'Leading provider of cutting-edge dialysis equipment and comprehensive renal care solutions, serving healthcare facilities worldwide with innovative technology and unwavering commitment to patient care.',
  keywords: 'dialysis, medical equipment, renal care, hemodialysis, water treatment, patient chairs, medical devices',
  icons: {
    icon: '/assets/logo/metadatalogo.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-inter antialiased bg-background text-foreground">
        {/* <BranchProvider> */}
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        {/* </BranchProvider> */}
      </body>
    </html>
  )
}