import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dmsmgcwaeuxrqmtwcqyj.supabase.co';
const supabaseAnonKey = 'sb_publishable_uKGiW-mNYiMeF9uziPL3aA_lYeYIXJS';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to check if Supabase is available
export const isSupabaseAvailable = async () => {
    try {
        const { error } = await supabase.from('ingredients').select('count').limit(1);
        return !error;
    } catch {
        return false;
    }
};
