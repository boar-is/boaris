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
    const res = await fetch('', {
      method: 'POST',
    })
    const json: any = await res.json()

    if (json['subscription']?.['subscriber']?.['id']) {
      return {
        email,
      }
    }
  } catch (error) {}
  return {
    error: 'Something went wrong',
  }
}
