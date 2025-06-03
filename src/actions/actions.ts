"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';

export async function checkUUIDExists(uuid: string) {
  const cookieStore = cookies();
  const supabase = createServerActionClient({ cookies: () => cookieStore }, {supabaseUrl: process.env.SUPABASE_URL, supabaseKey: process.env.SUPABASE_ANON_KEY});
  
  console.log('Checking if UUID exists:', uuid);
  
  const { data, error } = await supabase
    .from('batchesnew')
    .select('id')
    .eq('id', uuid)
    .single();

  console.log('UUID check result:', { data, error });

  return data;
}

export async function getUserEmail() {
  const cookieStore = await cookies();
  const email = cookieStore.get('user_email');
  return email?.value || null;
}

export async function saveUserEmail(email: string) {
  const cookieStore = await cookies();
  cookieStore.set('user_email', email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30 // 30 days
  });
  return true;
}

export async function getBeekeeperInfo(uuid: string) {
  const cookieStore = cookies();
  const supabase = createServerActionClient({ cookies: () => cookieStore }, {supabaseUrl: process.env.SUPABASE_URL, supabaseKey: process.env.SUPABASE_ANON_KEY});
  
  const { data, error } = await supabase
  .from('batchesnew')
  .select(`
    id,
    beekeeper:beekeeper_id (
      id,
      title,
      description
    )
  `)
  .eq('id', uuid)
  .maybeSingle();

  if (error) {
    console.error('Error fetching beekeeper info:', error);
    return null;
  }

  console.log('Beekeeper info:', data);

  return data as { uuid: string; beekeeper: { id: string;title: string; description: string; } | null; } | null;
}


export async function getProductInfo(uuid: string) {
  const cookieStore = cookies();
  const supabase = createServerActionClient({ cookies: () => cookieStore }, {supabaseUrl: process.env.SUPABASE_URL, supabaseKey: process.env.SUPABASE_ANON_KEY});
  
  const { data, error } = await supabase
  .from('batchesnew')
  .select(`
    id,
    product:product_id (
      id,
      name,
      mgo_level,
      size,
      review_link,
      title,
      title_arabic,
      image_url
    )
  `)
  .eq('id', uuid)
  .maybeSingle();

  if (error) {
    console.error('Error fetching product info:', error);
    return null;
  }

  const product = Array.isArray(data?.product) ? data.product[0] : data?.product;

  return {
    uuid: data?.id,
    product: product ? {
      ...product,
      mgo_level: Number(product.mgo_level)
    } : null
  };
}

export async function getRegionInfo(uuid: string) {
  const cookieStore = cookies();
  const supabase = createServerActionClient({ cookies: () => cookieStore }, {supabaseUrl: process.env.SUPABASE_URL, supabaseKey: process.env.SUPABASE_ANON_KEY});
  
  const { data, error } = await supabase
  .from('batchesnew')
  .select(`
    id,
    region:region_id (
      id,
      title,
      description,
      main_image_url
    )
  `)
  .eq('id', uuid)
  .maybeSingle();

  if (error) {
    console.error('Error fetching region info:', error);
    return null;
  }

  return data as { uuid: string; region: { id: string; title: string; description: string; main_image_url: string; } | null; } | null;
}


export async function getBatchInfo(uuid: string) {
  const cookieStore = cookies();
  const supabase = createServerActionClient({ cookies: () => cookieStore }, {supabaseUrl: process.env.SUPABASE_URL, supabaseKey: process.env.SUPABASE_ANON_KEY});
  
  const { data, error } = await supabase
  .from('batchesnew')
  .select(`
    id,
    mgo_rating,
    umf_rating,
    test_date,
    notes,
    potency_report_url,
    purity_report_url,
    notes_image_url
  `)
  .eq('id', uuid)
  .maybeSingle();

  if (error) {
    console.error('Error fetching batch info:', error);
    return null;
  }
  console.log('Batch info:', data);

  return data as { id: string; mgo_rating: number; umf_rating: number; test_date: string; notes: string; potency_report_url: string; purity_report_url: string; notes_image_url: string; } | null;
}