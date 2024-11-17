import { type Getter, atom } from 'jotai'
import { useConst } from '~/lib/react/use-const'

export const useStableAtom = <T>(read: (get: Getter) => T) =>
  useConst(() => atom(read))
