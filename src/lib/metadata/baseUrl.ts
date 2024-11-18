/**
 * @see https://vercel.community/t/create-a-website-url-env-variable-for-all-environments/804
 */
export const baseUrl = process.env['NEXT_PUBLIC_WEBSITE_URL']!

export const isLocalhost = baseUrl.startsWith('http://localhost:')
