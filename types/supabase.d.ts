import { UserAttributes, AuthError, User } from '@supabase/gotrue-js';
import { SupabaseAuthClient } from '@supabase/supabase-js';

declare module '@supabase/supabase-js' {
  interface SupabaseAuthClient {
    updateUser(
      attributes: UserAttributes,
      options?: { token?: string; emailRedirectTo?: string }
    ): Promise<{
      data?: User | null;
      user: User | null;
      error: AuthError | null;
    }>;
  }
}
