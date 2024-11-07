'use server'

import { Schema } from 'effect'
import { Email } from '~/model/email'

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

export async function subscribeToNewsletter(
  _: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const email = formData.get('email') as string

  if (!Schema.is(Email)(email)) {
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
          Accept: 'application/json; charset=UTF-8',
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          api_key: process.env['CONVERTKIT_API_KEY'],
          email,
        }),
      },
      // biome-ignore lint/suspicious/noExplicitAny: yolo
    ).then((it) => it.json() as any)

    if (res['subscription']?.['subscriber']?.['id']) {
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
