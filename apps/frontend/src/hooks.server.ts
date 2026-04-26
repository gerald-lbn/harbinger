import { deleteTokenCookie, setTokenCookie, validateSessionToken } from '$lib/server/session'
import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

export const authHandle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token') ?? null
	if (token === null) {
		event.locals.user = null
		event.locals.token = null
		return resolve(event)
	}

	const user = await validateSessionToken(token)

	if (user) {
		setTokenCookie(event, token)
	} else {
		deleteTokenCookie(event)
	}

	event.locals.user = user
	event.locals.token = token

	return resolve(event)
}

export const handle = sequence(authHandle)
