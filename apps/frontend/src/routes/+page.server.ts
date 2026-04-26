export const load = async ({ parent }) => {
	const { user, token } = await parent()
	return { user, token }
}
