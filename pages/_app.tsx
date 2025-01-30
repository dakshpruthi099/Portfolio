import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { Geist } from 'next/font/google'
import Layout from '@/components/layout/Layout'
import { Analytics } from '@vercel/analytics/react'

const geist = Geist({
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" enableSystem defaultTheme="dark" disableTransitionOnChange>
      <div className={`${geist.className} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Analytics />
      </div>
    </ThemeProvider>
  )
}