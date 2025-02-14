'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateBrewery } from './actions';
import { Database } from '@/types/supabase';
import { getImageUrl } from '@/lib/utils/getImageUrl';
import { createClient } from '@/lib/utils/supabase/client';

type Brewery = Database['public']['Tables']['breweries']['Row'];

const UpdateBreweryForm = ({ brewery }: { brewery: Brewery }) => {
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const [formData, setFormData] = useState<Brewery>({
    ...brewery,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    brewery.image_path ? getImageUrl(brewery.image_path) : null
  );

  useEffect(() => {
    setFormData({
      ...brewery,
    });
    if (brewery.image_path) {
      setPreviewUrl(getImageUrl(brewery.image_path, 'breweries'));
    }
  }, [brewery]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File) => {
    if (!file) {
      return null;
    }

    const filePath = `${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from('images/breweries')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Supabase Storage Error:', error);
      throw new Error('画像のアップロードに失敗しました: ' + error.message);
    }

    return data.path;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    let uploadedImagePath = formData.image_path || null;

    try {
      if (selectedFile) {
        uploadedImagePath = await uploadImage(selectedFile);
      }

      const updatedFormData = {
        ...formData,
        image_path: uploadedImagePath,
      };

      const result = await updateBrewery(updatedFormData);

      if (result?.error) {
        setError(result.error);
      } else {
        router.push(`/brewery/${brewery.id}`);
      }
    } catch (error: any) {
      setError(error.message || '画像のアップロードまたは更新に失敗しました');
      console.error('Error in handleSubmit:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">更新しました！</div>}
      <div className="grid justify-items-center">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt={formData.name || 'No Name'}
            className="rounded-lg aspect-square object-cover w-52"
          />
        ) : (
          <div>No Image</div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input file-input-bordered file-input-primary w-full max-w-xs mt-4"
        />
      </div>
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
