import { invalid, redirect } from '@sveltejs/kit'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import type { PageServerLoad, Actions } from './$types'

export const load: PageServerLoad = async (event) => {
	const { supabaseClient, session } = await getSupabase(event)

	if (!session) {
		throw redirect(303, '/login')
	}

	const { data } = await supabaseClient.from('profiles').select('id, display_name').single()

	return { profile: data }
}

export const actions: Actions = {
	default: async (event) => {
		const { supabaseClient, session } = await getSupabase(event)

		if (!session) {
			return invalid(401, {
				error: 'You must be logged in to change your display name! To HAVE a display name even.'
			})
		}

		const formData = await event.request.formData()
		const displayName = formData.get('display_name')

		if (!displayName || typeof displayName !== 'string') {
			return invalid(400, { error: 'You need to specify a display name' })
		}

		const { error } = await supabaseClient
			.from('profiles')
			.update({ display_name: displayName })
			.match({ id: session.user.id })

		if (error) {
			return invalid(400, {
				error: `Could not update display name to ${displayName}... Maybe it's taken?`
			})
		}
	}
}
