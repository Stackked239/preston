import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a placeholder client if credentials aren't available
// This prevents build errors - the hooks will show an error state
let supabase: SupabaseClient;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Create a mock client for build time - will error at runtime if used
  supabase = createClient(
    "https://placeholder.supabase.co",
    "placeholder-key"
  );
}

export { supabase };

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
