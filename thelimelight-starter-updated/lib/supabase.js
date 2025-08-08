import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if(!supabaseUrl || !supabaseKey) {
  console.warn('SUPABASE not configured. Media upload endpoints will need manual wiring.');
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '');
