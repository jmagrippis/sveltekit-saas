import type { PageServerLoad } from './$types'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

export const load: PageServerLoad = async () => ({
	supabaseUrl: PUBLIC_SUPABASE_URL,
	supabaseAnonKey: PUBLIC_SUPABASE_ANON_KEY
})
