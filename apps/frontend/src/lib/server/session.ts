import { client } from '$lib/api'
import type { RequestEvent } from '@sveltejs/kit'

export function setTokenCookie(event: RequestEvent, token: string): void {
	event.cookies.set('token', token, {
		httpOnly: true,
		path: '/',
		secure: import.meta.env.PROD,
		sameSite: 'lax'
	})
}

export function deleteTokenCookie(event: RequestEvent): void {
	event.cookies.set('token', '', {
		httpOnly: true,
		path: '/',
		secure: import.meta.env.PROD,
		sameSite: 'lax',
		maxAge: 0
	})
}

export async function validateSessionToken(token: string): Promise<App.Locals['user']> {
	const [result, error] = await client.api.profile.profile
		.show({ headers: { Authorization: `Bearer ${token}` } })
		.safe()

	if (error) return null

	return result.data
}
