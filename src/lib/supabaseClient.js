import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://nooqhfnmdpyluzxfiugw.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_rIr2QQbBXbOYdBXuZ0UL4A_JA98-Mgy";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
