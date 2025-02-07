import { createClient } from '@supabase/supabase-js'
const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || 'default_supabase_url'
const supabaseKey: string = process.env.NEXT_PUBLIC_ANON_KEY || 'default_supabase_key'
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase