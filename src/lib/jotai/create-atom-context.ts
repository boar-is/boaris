import { type Atom, useAtomValue } from 'jotai'
import { useConstAtom } from '~/lib/jotai/use-const-atom'
import {
  type CreateContextOptions,
  createStrictContext,
} from '~/lib/react/create-strict-context'

export const createAtomContext = <T>({
  ...createContextOptions
}: CreateContextOptions) => {
  const [Context, useContext] =
    createStrictContext<Atom<T>>(createContextOptions)

  const useAtom = <R>(mapFn: (t: T) => R) => {
    const contextAtom = useContext()
    return useConstAtom((get) => mapFn(get(contextAtom)))
  }

  const useAtomVal = <R>(mapFn: (t: T) => R) => useAtomValue(useAtom(mapFn))

  return [Context, useAtom, useAtomVal] as const
}
