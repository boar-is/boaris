'use server'

export type SubscribeState =
  | { email: string }
  | {
      error: string
    }

const emailRegex =
  /^(?!\.)(?!.*\.\.)([A-Z0-9_+-.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i

export async function subscribe(
  _: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const email = formData.get('email') as string

  if (!emailRegex.test(email)) {
    return {
      error: 'Wrong email format',
    }
  }

  try {
    const res = await fetch(
      `https://api.convertkit.com/v3/forms/${process.env['CONVERTKIT_API_FORM_ID']}/subscribe`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          api_key: process.env['CONVERTKIT_API_KEY'],
          email,
        }),
      },
    )

    if (((await res.json()) as any)['subscription']?.['subscriber']?.['id']) {
      return {
        email,
      }
    }
  } catch (error) {}
  return {
    error: 'Something went wrong',
  }
}
