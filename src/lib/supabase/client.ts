import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

/**
 * Browser-safe Supabase client using the anon/publishable key.
 * Relies on RLS - do not use for privileged reads/writes.
 */
export function createBrowserSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient<Database>(url, anonKey);
}
