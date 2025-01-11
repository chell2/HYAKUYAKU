'use client';
import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/lib/utils/supabase/client';
import { type User } from '@supabase/supabase-js';

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from('profile')
        .select(`name, role`)
        .eq('id', user?.id ?? '')
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setName(data.name);
        setRole(data.role);
      }
    } catch (err: unknown) {
      console.error('Error loading user data:', err);
      alert('Error loading user data!');
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    name,
    role,
  }: {
    name: string | null;
    role: string | null;
  }) {
    try {
      setLoading(true);

      const { error } = await supabase.from('profile').upsert({
        id: user?.id as string,
        name,
        role,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert('Profile updated!');
    } catch (err: unknown) {
      console.error('Error updating the data:', err);
      alert('Error updating the data!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={user?.email} disabled />
      </div>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="role">Role</label>
        <input
          id="role"
          type="text"
          value={role || ''}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile({ name, role })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <form action="/auth/signout" method="post">
          <button className="button block" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
