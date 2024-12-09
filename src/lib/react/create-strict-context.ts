import { createContext, use } from 'react'

export interface CreateContextOptions {
  errorMessage?: string | undefined
  name?: string | undefined
}

export function createStrictContext<ContextType>({
  errorMessage = 'useContext: `context` is undefined. Seems you forgot to wrap component within the Provider',
  name,
}: CreateContextOptions = {}) {
  const Context = createContext<ContextType | undefined>(undefined)

  Context.displayName = name

  function useContext() {
    const context = use(Context)

    if (!context) {
      const error = new Error(errorMessage)

      error.name = 'ContextError'
      Error.captureStackTrace?.(error, useContext)
      throw error
    }

    return context
  }

  return [Context, useContext] as const
}
