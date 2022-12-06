<script lang="ts">
	import { goto } from '$app/navigation'
	import { supabase } from '$lib/supabaseClient'
	import type { PageData } from './$types'

	type LogoutFormState = 'idle' | 'submitting' | Error | 'done'
	let state: LogoutFormState = 'idle'

	export let data: PageData
</script>

<h1>Your profile</h1>
<form method="POST" action="profile">
	<label>
		<span>You may update your <strong>Display Name</strong>:</span>
		<input name="display_name" value={data.profile?.display_name} />
	</label>
	<button>Update</button>
</form>
<form
	method="POST"
	on:submit|preventDefault={async () => {
		try {
			state = 'submitting'
			let { error } = await supabase.auth.signOut()
			if (error) throw error
			state = 'done'

			await goto('/')
		} catch (error) {
			if (error instanceof Error) {
				state = error
			} else {
				state = new Error('There was a problem logging you out...')
			}
		}
	}}
>
	<button disabled={state === 'submitting'}>Logout</button>
</form>
