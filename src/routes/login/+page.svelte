<script lang="ts">
	import { goto } from '$app/navigation'
	import { supabase } from '$lib/supabaseClient'

	type FormState = 'idle' | 'submitting' | Error | 'email-sent' | 'github'
	let state: FormState = 'idle'
</script>

{#if state !== 'email-sent' && state !== 'github'}
	<form
		method="POST"
		on:submit|preventDefault={async ({ currentTarget }) => {
			const formData = new FormData(currentTarget)
			const email = formData.get('email')
			try {
				state = 'submitting'
				const { error } = await supabase.auth.signInWithOtp({ email })
				if (error) throw error

				state = 'done'
			} catch (error) {
				if (error instanceof Error) {
					state = error
				} else {
					state = new Error('Something went wrong sending to your email... Try again?')
				}
			}
		}}
	>
		<label>
			<div style="padding-bottom: 0.25rem">Register / Login with Magic Link:</div>
			<input
				style="font-size: 2rem; padding: 0.25rem 0.5rem; display: block; margin-bottom: 0.5rem"
				name="email"
				type="email"
				placeholder="your@email.com"
				required
			/>
		</label>
		<button style="font-size: 2rem; display: block" disabled={state === 'submitting'}
			>Send magic link</button
		>
		{#if state instanceof Error}
			<p>{state.message}</p>
		{/if}
	</form>
	<button
		on:click={async () => {
			try {
				state = 'submitting'
				const { error } = await supabase.auth.signInWithOAuth({
					provider: 'github'
				})
				if (error) throw error

				state = 'github'
				await goto('/profile')
			} catch (error) {
				if (error instanceof Error) {
					state = error
				} else {
					state = new Error('Something went wrong logging you in with GitHub... Try again?')
				}
			}
		}}
		disabled={state === 'submitting'}>Or login with GitHub</button
	>
{:else if state === 'email-sent'}
	<p>We've sent you an email! Please check your inbox 😄</p>
{:else if state === 'github'}
	<p>Logging you in with GitHub...</p>
{/if}
