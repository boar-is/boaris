import * as jsondiffpatch from 'jsondiffpatch'

export const diffpatcher = jsondiffpatch.create({
  // biome-ignore lint/suspicious/noExplicitAny: the best choice here
  objectHash: (obj: any) => {
    return obj._id ?? obj.id ?? obj.attrs?.id
  },
  cloneDiffValues: true,
})
