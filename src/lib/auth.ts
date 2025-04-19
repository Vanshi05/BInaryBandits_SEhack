
import { supabase } from "@/integrations/supabase/client";

export async function signUp({
  email,
  password,
  fullName,
  phoneNumber,
}: {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  
  if (error) throw error;
  
  if (data.user) {
    // Update the profile with phone number
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ phone_number: phoneNumber })
      .eq('id', data.user.id);
    
    if (profileError) throw profileError;
  }
  
  return data;
}

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
