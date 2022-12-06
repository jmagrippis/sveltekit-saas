export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
	public: {
		Tables: {
			profiles: {
				Row: {
					id: string
					display_name: string | null
				}
				Insert: {
					id: string
					display_name?: string | null
				}
				Update: {
					id?: string
					display_name?: string | null
				}
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			[_ in never]: never
		}
		Enums: {
			[_ in never]: never
		}
	}
}
