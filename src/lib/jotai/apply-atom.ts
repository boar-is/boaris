import type { Atom, Getter } from 'jotai'

export const applyAtom =
  <A>(atom: Atom<A>) =>
  (getter: Getter): A =>
    getter(atom)
