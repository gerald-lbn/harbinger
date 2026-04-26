import type { Route } from '@tuyau/core/types'

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: Route.Response<'auth.access_token.store'>['data']['user'] | null
			token: Route.Response<'auth.access_token.store'>['data']['token'] | null
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}
