"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';

export async function checkUUIDExists(uuid: string) {
  const cookieStore = cookies();
  const supabase = createServerActionClient({ cookies: () => cookieStore }, {supabaseUrl: process.env.SUPABASE_URL, supabaseKey: process.env.SUPABASE_ANON_KEY});
  
  const { data, error } = await supabase
    .from('batches')
    .select('uuid')
    .eq('uuid', uuid)
    .single();

  if (error && error.code !== 'PGSQL_EMPTY_RESULT') {
    console.error('Error querying Supabase:', error);
    return false;
  }

  return data !== null;
}

export async function getUserEmail(): Promise<string | null> {
  const cookieStore = cookies();
  const supabase = createServerActionClient({ cookies: () => cookieStore }, {supabaseUrl: process.env.SUPABASE_URL, supabaseKey: process.env.SUPABASE_ANON_KEY});
  
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user?.email) {
    return null;
  }
  
  return session.user.email;
}

export async function saveUserEmail(email: string): Promise<void> {
  const cookieStore = cookies();
  const supabase = createServerActionClient({ cookies: () => cookieStore }, {supabaseUrl: process.env.SUPABASE_URL, supabaseKey: process.env.SUPABASE_ANON_KEY});
  
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
    }
  });
  
  if (error) {
    console.error('Error signing in with OTP:', error);
    throw new Error('Failed to save email. Please try again.');
  }
}
