import {
  createContext as _createContext,
  useContext as _useContext,
} from 'react'

export interface CreateContextOptions {
  strict?: boolean
  errorMessage?: string
  name?: string
}

export function createContext<ContextType>({
  strict = true,
  errorMessage = 'useContext: `context` is undefined. Seems you forgot to wrap component within the Provider',
  name,
}: CreateContextOptions = {}) {
  const Context = _createContext<ContextType | undefined>(undefined)

  Context.displayName = name

  function useContext() {
    const context = _useContext(Context)

    if (!context && strict) {
      const error = new Error(errorMessage)

      error.name = 'ContextError'
      Error.captureStackTrace?.(error, useContext)
      throw error
    }

    return context
  }

  return [Context, useContext] as const
}
