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
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-md w-full">
          <div className="card bg-base-100 w-full shadow-2xl">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={user?.email}
                  className="input input-bordered"
                  disabled
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name || ''}
                  className="input input-bordered"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Role</span>
                </label>
                <input
                  id="role"
                  name="role"
                  type="text"
                  value={role || ''}
                  className="input input-bordered"
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
              <div className="form-control mt-2">
                <button
                  className="btn btn-primary"
                  onClick={() => updateProfile({ name, role })}
                  disabled={loading}
                >
                  {loading ? 'Loading ...' : '更新'}
                </button>
              </div>
              <form action="/auth/signout" method="post">
                <div className="form-control mt-2">
                  <button className="btn btn-secondary">ログアウト</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
