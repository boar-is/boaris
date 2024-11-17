import { type Atom, atom } from 'jotai'
import { useAtomValue } from 'jotai/index'
import { useConstant } from '~/lib/react/use-constant'

export const useAtomSelectorValue =
  <T>(a: Atom<T>) =>
  <R>(mapFn: (t: T) => R) =>
    useAtomValue(useConstant(() => atom((get) => mapFn(get(a)))))
