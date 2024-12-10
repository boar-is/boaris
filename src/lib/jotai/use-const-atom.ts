import { type Atom, type Getter, type PrimitiveAtom, atom } from 'jotai'
import { useConst } from '~/lib/react/use-const'

export function useConstAtom<T>(read: (get: Getter) => T): Atom<T>
export function useConstAtom<T>(initialValue: T): PrimitiveAtom<T>
export function useConstAtom<T>(read: ((get: Getter) => T) | T) {
  return useConst(() => atom(read))
}
