import { type Atom, useAtomValue } from 'jotai'

export function AtomEffect({ value }: { value: Atom<void> }) {
  useAtomValue(value)

  return null
}
