'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateBrewery } from './actions';
import { Database } from '@/types/supabase';

type Brewery = Database['public']['Tables']['breweries']['Row'];

const UpdateBreweryForm = ({ brewery }: { brewery: Brewery }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<Brewery>({
    ...brewery,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const result = await updateBrewery(formData);

    if (result?.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      router.push(`/brewery/${brewery.id}`);
    }

    setIsLoading(false);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <div>
        <label htmlFor="name" className="block mb-2">
          名前
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name || ''}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded w-full"
        />
      </div>
      <div>
        <label htmlFor="region" className="block mb-2">
          地域
        </label>
        <input
          type="text"
          id="region"
          name="region"
          value={formData.region || ''}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded w-full"
        />
      </div>
      <div>
        <label htmlFor="description" className="block mb-2">
          説明
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded w-full"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-secondary px-8"
        >
          {isLoading ? '更新中...' : '更　新'}
        </button>
        {/* <button className="btn btn-outline btn-neutral ml-4">クリア</button> */}
      </div>
    </form>
  );
};

export default UpdateBreweryForm;
