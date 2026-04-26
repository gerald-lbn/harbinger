import { client, prettifyErrors } from '$lib/api'
import { fail, redirect } from '@sveltejs/kit'
import type { Path } from '@tuyau/core/types'

type SignUpBodyKeys = keyof Path.Body<'POST', '/api/v1/auth/signup'>

export const load = async ({ locals }) => {
	const user = locals.user
	const token = locals.token

	if (user && token) {
		return redirect(302, '/')
	}
}

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData()
		const fullName = formData.get('fullName')?.toString() || ''
		const email = formData.get('email')?.toString() || ''
		const password = formData.get('password')?.toString() || ''
		const passwordConfirmation = formData.get('passwordConfirmation')?.toString() || ''

		const [, error] = await client.api.auth.newAccount
			.store({
				body: { fullName, email, password, passwordConfirmation }
			})
			.safe()

		if (error) {
			if (error?.isValidationError()) {
				const prettifiedErrors = prettifyErrors<SignUpBodyKeys>(error.response.errors)
				return fail(400, {
					errors: prettifiedErrors
				})
			}
		}

		return redirect(302, '/auth/login')
	}
}
