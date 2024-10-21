import { atom, useSetAtom } from 'jotai'
import { useConstant } from '~/lib/react/use-constant'

export const useHookAtom = <T>(
  initialValue: T,
  fn: (setState: (value: T) => void) => void,
) => {
  const atom$ = useConstant(() => atom(initialValue))
  const setAtom = useSetAtom(atom$)

  fn(setAtom)

  return atom$
}
