import * as jsondiffpatch from 'jsondiffpatch'

export type { Delta } from 'jsondiffpatch'

export const diffpatcher = jsondiffpatch.create({
  // biome-ignore lint/suspicious/noExplicitAny: best choice here
  objectHash: (obj: any) => {
    return obj._id ?? obj.id ?? obj.attrs?.id
  },
})
