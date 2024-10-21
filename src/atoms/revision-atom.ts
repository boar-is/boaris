import { atom } from 'jotai'
import type { Revision } from '~/convex/data/revision'

export const revisionAtom = (revision: Revision) => atom(revision)
