import { type Atom, useAtomValue } from 'jotai'
import { useStableAtom } from '~/lib/jotai/use-stable-atom'
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
    return useStableAtom((get) => mapFn(get(contextAtom)))
  }

  const useAtomVal = <R>(mapFn: (t: T) => R) => useAtomValue(useAtom(mapFn))

  return [Context, useAtom, useAtomVal] as const
}
