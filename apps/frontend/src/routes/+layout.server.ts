export const load = async ({ locals }) => {
	const { user, token } = locals

	return { user, token }
}
