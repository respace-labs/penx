import '@/styles/globals.css'
import '@/styles/prosemirror.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { TokenProvider } from '@/components/TokenContext'
import { getSession } from '@/lib/auth'
import { cn } from '@/lib/utils'
import { cal, inter } from '@/styles/fonts'
import { Analytics } from '@vercel/analytics/react'
import jwt from 'jsonwebtoken'
import { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { headers } from 'next/headers'
import { Providers } from './providers'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const title = 'PenX: the space for web3 creator'
const description =
  'PenX is the the space for web3 creator, find 1000 true fans in PenX'
const image = 'https://vercel.pub/thumbnail.png'

export const metadata: Metadata = {
  title,
  description,
  icons: ['https://vercel.pub/favicon.ico'],
  openGraph: {
    title,
    description,
    images: [image],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [image],
    creator: '@penx',
  },
  metadataBase: new URL('https://penx.io'),
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headerList = headers()
  const url = headerList.get('x-current-url') || ''

  const session: any = await getSession()
  // console.log('====session:', session)
  let token = ''

  if (session) {
    token = jwt.sign(
      {
        userId: session?.userId,
        address: session?.address,
      },
      process.env.NEXTAUTH_SECRET!,
      {
        expiresIn: '30d',
      },
    )
  }
  // console.log('======token:', token)

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          cal.variable,
          inter.variable,
          fontSans.variable,
          url === '/' && 'bg-zinc-100',
        )}
      >
        <ThemeProvider
          attribute="class"
          // defaultTheme="system"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <TokenProvider token={token}>
              {children}
              <Analytics />
            </TokenProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
