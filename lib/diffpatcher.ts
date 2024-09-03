import jsondiffpatch from 'jsondiffpatch'

export type { Delta } from 'jsondiffpatch'

export const diffpatcher = jsondiffpatch.create({})
