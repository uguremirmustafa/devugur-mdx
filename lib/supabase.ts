import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://splzdyzfumgfeotiawcf.supabase.co';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, SUPABASE_KEY);
