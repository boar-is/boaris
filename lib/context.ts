import {
  type Context,
  type Provider,
  createContext as _createContext,
  useContext as _useContext,
} from 'react'

export interface CreateContextOptions {
  strict?: boolean
  errorMessage?: string
  name?: string
}

export type CreateContextReturn<T> = [Provider<T>, () => T, Context<T>]

export function createContext<ContextType>(options: CreateContextOptions = {}) {
  const {
    strict = true,
    errorMessage = 'useContext: `context` is undefined. Seems you forgot to wrap component within the Provider',
    name,
  } = options

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

  return [
    Context.Provider,
    useContext,
    Context,
  ] as CreateContextReturn<ContextType>
}
