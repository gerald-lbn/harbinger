import { client, prettifyErrors } from '$lib/api'
import type { PrettifiedError } from '$lib/api/types'
import { setTokenCookie } from '$lib/server/session'
import { fail, redirect } from '@sveltejs/kit'
import type { Path } from '@tuyau/core/types'

type LoginBodyKeys = keyof Path.Body<'POST', '/api/v1/auth/login'>

export const load = async ({ locals }) => {
	const user = locals.user
	const token = locals.token

	if (user && token) {
		return redirect(302, '/')
	}
}

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData()
		const email = formData.get('email')?.toString() || ''
		const password = formData.get('password')?.toString() || ''

		const [data, error] = await client.api.auth.accessToken
			.store({
				body: { email, password }
			})
			.safe()

		if (error !== null) {
			if (error?.isValidationError()) {
				const prettifiedErrors = prettifyErrors<LoginBodyKeys>(error.response.errors)
				return fail(422, {
					errors: prettifiedErrors
				})
			}

			if (error.status === 400) {
				const errors: PrettifiedError<LoginBodyKeys> = {
					email: {
						message: 'Invalid user credentials',
						rule: ''
					}
				}
				return fail(400, { errors })
			}

			console.log(error)
			return fail(500, { errors: {} })
		}

		const { token } = data.data
		setTokenCookie(event, token)

		return redirect(302, '/')
	}
}
