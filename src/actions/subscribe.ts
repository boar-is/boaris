'use server'

type SubscribeState =
  | {
      status: 'initial'
    }
  | {
      status: 'success'
      email: string
    }
  | {
      status: 'error'
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
      status: 'error',
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

    // biome-ignore lint/suspicious/noExplicitAny: yolo
    if (((await res.json()) as any)['subscription']?.['subscriber']?.['id']) {
      return {
        status: 'success',
        email,
      }
    }
  } catch (error) {}
  return {
    status: 'error',
    error: 'Something went wrong',
  }
}
