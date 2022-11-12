// This is a helper file to initialize the Supabase client.
// These variables will be exposed on the browser,
// and that's completely fine since we have Row Level Security enabled on our Database.

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
