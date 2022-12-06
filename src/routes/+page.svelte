<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData
</script>

<h1>SAAS with SvelteKit & Supabase</h1>

<p>A demo Software as a Service solution, using SvelteKit & Supabase</p>

{#if data.session}
	View your <a href="/profile">profile</a>
{:else}
	<a href="/login">Login</a>
{/if}
