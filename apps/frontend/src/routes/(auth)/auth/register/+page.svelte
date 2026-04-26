<script lang="ts">
	import { enhance } from '$app/forms'
	import AuthHeading from '$lib/components/auth-heading.svelte'
	import { Button } from '$lib/components/ui/button'
	import { Input } from '$lib/components/ui/input'
	import * as Field from '$lib/components/ui/field'
	import type { SubmitFunction } from '@sveltejs/kit'

	let { form } = $props()
	let isLoading = $state(false)

	const onSubmit: SubmitFunction = () => {
		isLoading = true

		return async ({ update }) => {
			await update()
			isLoading = false
		}
	}
</script>

<AuthHeading
	heading="Create an account"
	subheading="Enter your details below to create your account."
/>

<form class="flex flex-col gap-5" method="POST" use:enhance={onSubmit}>
	<div class="flex flex-col gap-4">
		<Field.Field
			class="flex w-full max-w-sm flex-col gap-1.5"
			data-invalid={form?.errors?.fullName !== undefined}
		>
			<Field.Label for="fullName">Full Name</Field.Label>
			<Input
				type="text"
				id="fullName"
				name="fullName"
				placeholder="Enter your full name"
				required
			/>
			<Field.Error errors={[form?.errors?.fullName]} />
		</Field.Field>
		<Field.Field
			class="flex w-full max-w-sm flex-col gap-1.5"
			data-invalid={form?.errors?.email !== undefined}
		>
			<Field.Label for="email">Email</Field.Label>
			<Input type="email" id="email" name="email" placeholder="Enter your email" required />
			<Field.Error errors={[form?.errors?.email]} />
		</Field.Field>
		<Field.Field
			class="flex w-full max-w-sm flex-col gap-1.5"
			data-invalid={form?.errors?.password !== undefined}
		>
			<Field.Label for="password">Password</Field.Label>
			<Input type="password" id="password" name="password" placeholder="••••••••••••" required />
			<Field.Error errors={[form?.errors?.password]} />
		</Field.Field>
		<Field.Field
			class="flex w-full max-w-sm flex-col gap-1.5"
			data-invalid={form?.errors?.passwordConfirmation !== undefined}
		>
			<Field.Label for="passwordConfirmation">Confirm Password</Field.Label>
			<Input
				type="password"
				id="passwordConfirmation"
				name="passwordConfirmation"
				placeholder="••••••••••••"
				required
			/>
			<Field.Error errors={[form?.errors?.passwordConfirmation]} />
		</Field.Field>
	</div>
	<Button size="lg" type="submit" disabled={isLoading}>
		{#if isLoading}
			Loading...
		{:else}
			Continue
		{/if}
	</Button>
</form>
<div class="flex justify-center gap-1 text-center">
	<span class="text-sm text-muted-foreground">Already have an account? </span>
	<Button variant="link" class="h-min p-0" href="/auth/login">Log in</Button>
</div>
