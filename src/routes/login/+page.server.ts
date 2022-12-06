import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async (event) => {
	const { session } = await event.parent()
	if (session) {
		throw redirect(303, '/profile')
	}
}
