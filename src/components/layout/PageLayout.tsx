import { type ReactNode } from 'react'

interface PageLayoutProps {
  title: string
  children: ReactNode
  loading?: boolean
  error?: string | null
}

export const PageLayout = ({
  title,
  children,
  loading,
  error,
}: PageLayoutProps) => {
  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <div className="text-lg text-red-500">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-4">
      <h1 className="mb-8 text-2xl font-bold">{title}</h1>
      <div className="flex w-full max-w-2xl flex-col items-center gap-6">
        {children}
      </div>
    </div>
  )
}
