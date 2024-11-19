/**
 * @see https://vercel.community/t/create-a-website-url-env-variable-for-all-environments/804
 */
export const baseUrl = (() => {
  const vercelDomain =
    process.env['VERCEL_PROJECT_PRODUCTION_URL'] ||
    process.env['NEXT_PUBLIC_VERCEL_BRANCH_URL']

  return process.env.NODE_ENV === 'production' && vercelDomain
    ? `https://${vercelDomain}`
    : 'http://localhost:3000'
})()

export const isLocalhost = baseUrl.startsWith('http://localhost:')
