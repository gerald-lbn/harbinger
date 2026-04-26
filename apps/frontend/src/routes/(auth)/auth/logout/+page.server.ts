import { client } from '$lib/api'
import { redirect } from '@sveltejs/kit'

export const load = async ({ locals }) => {
	const user = locals.user
	const token = locals.token

	if (!user || !token) {
		return redirect(302, '/auth/login')
	}

	await client.api.auth.accessToken
		.destroy({ headers: { Authorization: `Bearer ${token}` } })
		.safe()

	return redirect(302, '/auth/login')
}
