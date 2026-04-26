import { createTuyau } from '@tuyau/core/client'
import { registry } from '@harbinger/backend/registry'
import { env } from '$env/dynamic/private'
import { browser } from '$app/environment'
import type { PrettifiedError, SimpleError } from './types'

export const client = createTuyau({
	baseUrl: env.BACKEND_API_URL,
	registry,
	headers: { Accept: 'application/json' },
	hooks: {
		beforeRequest: [
			(request) => {
				if (browser) {
					const token = localStorage.getItem('auth_token')
					if (token) {
						request.headers.set('Authorization', `Bearer ${token}`)
					}
				}
			}
		]
	}
})

export const prettifyErrors = <T extends string>(errors: SimpleError[]): PrettifiedError<T> => {
	const result: PrettifiedError<T> = {}
	for (const error of errors) {
		result[error.field as T] = {
			message: error.message,
			rule: error.rule,
			index: error.index,
			meta: error.meta
		}
	}
	return result
}
