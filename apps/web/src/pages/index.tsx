import React, { lazy, Suspense } from 'react'
import { Box } from '@fower/react'
import { useSession } from 'next-auth/react'
import { SessionProvider } from '@penx/session'

const LazyEditorApp = lazy(() => import('@penx/app'))

const PageEditor = () => {
  const session = useSession()

  console.log('========session:', session)

  if (session?.status === 'loading') return null

  return (
    <SessionProvider
      value={{
        data: session.data as any,
        // loading: session.status === 'loading',
        loading: false,
      }}
    >
      <Suspense
        fallback={
          <Box h-100vh toCenterY black bgWhite>
            Loading...
          </Box>
        }
      >
        <LazyEditorApp></LazyEditorApp>
      </Suspense>
    </SessionProvider>
  )
}

export default PageEditor
