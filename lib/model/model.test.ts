import { it } from 'vitest'
import { getBlogPost } from '~/lib/api/get-blog-post'

it('should test', async () => {
  console.log(await getBlogPost('use-deferred-value'))
})
