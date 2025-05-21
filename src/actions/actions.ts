"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';

export async function checkUUIDExists(uuid: string) {
  const cookieStore = cookies();
  const supabase = createServerActionClient({ cookies: () => cookieStore }, {supabaseUrl: process.env.SUPABASE_URL, supabaseKey: process.env.SUPABASE_ANON_KEY});
  
  const { data } = await supabase
    .from('batches')
    .select('uuid')
    .eq('uuid', uuid)
    .single();

  return data;
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

export async function getBeekeeperInfo(uuid: string) {
  const cookieStore = cookies();
  const supabase = createServerActionClient({ cookies: () => cookieStore }, {supabaseUrl: process.env.SUPABASE_URL, supabaseKey: process.env.SUPABASE_ANON_KEY});
  
  const { data, error } = await supabase
  .from('batches')
  .select(`
    uuid,
    beekeeper:beekeeper_id (
      id,
      name,
      bio
    )
  `)
  .eq('uuid', uuid)
  .single();

  if (error) {
    console.error('Error fetching beekeeper info:', error);
    return null;
  }

  return data;
}


export async function getProductInfo(uuid: string) {
  const cookieStore = cookies();
  const supabase = createServerActionClient({ cookies: () => cookieStore }, {supabaseUrl: process.env.SUPABASE_URL, supabaseKey: process.env.SUPABASE_ANON_KEY});
  
  const { data, error } = await supabase
  .from('batches')
  .select(`
    uuid,
    product:product_id (
      id,
      name,
      mgo_level,
      size
    )
  `)
  .eq('uuid', uuid)
  .single();

  if (error) {
    console.error('Error fetching product info:', error);
    return null;
  }

  return data;
}

export async function getRegionInfo(uuid: string) {
  const cookieStore = cookies();
  const supabase = createServerActionClient({ cookies: () => cookieStore }, {supabaseUrl: process.env.SUPABASE_URL, supabaseKey: process.env.SUPABASE_ANON_KEY});
  
  const { data, error } = await supabase
  .from('batches')
  .select(`
    uuid,
    region:region_id (
      id,
      name,
      description
    )
  `)
  .eq('uuid', uuid)
  .single();

  if (error) {
    console.error('Error fetching region info:', error);
    return null;
  }

  return data;

}

