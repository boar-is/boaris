import { type Atom, useAtomValue } from 'jotai'
import {
  type CreateContextOptions,
  createStrictContext,
} from '~/lib/react/create-strict-context'

export const createAtomContext = <T>({
  ...createContextOptions
}: CreateContextOptions) => {
  const [Context, useContext] =
    createStrictContext<Atom<T>>(createContextOptions)

  const useContextValue = () => useAtomValue(useContext())

  return [Context, useContextValue] as const
}
