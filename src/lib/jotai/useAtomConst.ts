import { type Getter, atom } from 'jotai'
import { useConstant } from '~/lib/react/use-constant'

export const useAtomConst = <T>(read: (get: Getter) => T) =>
  useConstant(() => atom(read))
