// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://bywenpbfgkpfezyygien.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5d2VucGJmZ2twZmV6eXlnaWVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NTAxMDQsImV4cCI6MjA2MTIyNjEwNH0.ZzsghNskjdioMOnos9V-ZePU6mm5LIB1iTAf2XjjsGE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);