import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('Supabase Configuration:', {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseAnonKey,
  url: supabaseUrl?.substring(0, 20) + '...' // Only show part of the URL for security
});

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase credentials. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  }
});

// Test the connection immediately
const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Supabase connection test failed:', {
        code: error.code,
        message: error.message,
        hint: error.hint,
        details: error.details
      });
    } else {
      console.log('Supabase connection successful, found', data?.length || 0, 'leads');
    }
  } catch (err) {
    console.error('Supabase connection test threw an error:', err);
  }
};

testConnection();
