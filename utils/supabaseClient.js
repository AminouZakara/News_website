import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const anonkey = process.env.SUPABASE_PUBLIC_ANON_KEY

export const supabase = createClient('https://qlgqtkcbjgzqnaffvous.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsZ3F0a2Niamd6cW5hZmZ2b3VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk3OTY4NzUsImV4cCI6MjAxNTM3Mjg3NX0.ZSknSBiVcTEpovH1fb4jURJ4cYPjIhJv9VWg743EE0s')