'use client';

import type { BreweryFormData } from '@/types/types';
import { useState } from 'react';
import { insertBreweryData } from '../lib/utils/insertBreweryData';
import { createClient } from '../lib/utils/supabase/client';

const BreweryInsert = () => {
  const [formData, setFormData] = useState<BreweryFormData>({
    name: '',
    region: '',
    description: '',
    image_path: '',
  });
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const supabase = createClient();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, type } = e.target;
    let value;

    if (type === 'checkbox') {
      value = (e.target as HTMLInputElement).checked;
    } else if (type === 'select-one') {
      value = (e.target as HTMLSelectElement).value;
    } else {
      value = (e.target as HTMLInputElement | HTMLTextAreaElement).value;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImage = async (file: File) => {
    const filePath = `${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from('images/breweries')
      .upload(filePath, file);

    if (error) {
      throw new Error('画像のアップロードに失敗しました: ' + error.message);
    }

    return data.path; // Supabase Storage に保存されたファイルのパス
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      let imagePath = null;

      if (imageFile) {
        imagePath = await uploadImage(imageFile);
      }

      const newBreweryData = {
        ...formData,
        image_path: imagePath,
      };

      const formDataToSubmit = new FormData();
      Object.entries(newBreweryData).forEach(([key, value]) => {
        formDataToSubmit.append(key, value as string | Blob);
      });
      await insertBreweryData(formDataToSubmit);
      alert('ブルワリーを追加しました！');
      console.log(`formDataToSubmit:` + imagePath);

      setFormData({
        name: '',
        region: '',
        description: '',
        image_path: '',
      });

      setImageFile(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('予期せぬエラーが発生しました');
      }
      console.error('エラー:', error);
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4">ブルワリー追加フォーム</h1>
        <div className="grid grid-cols-1 gap-4 pb-4">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">名称</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
              required
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">地域</span>
            </label>
            <input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
              required
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">説明</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full max-w-xs"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">ロゴ</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                />
              </div>
              {imageFile && (
                <div className="mt-2">
                  <p>プレビュー:</p>
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="選択された画像"
                    className="w-full aspect-square object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        <div className="flex justify-end gap-4">
          <button type="submit" className="btn btn-primary mt-4">
            追加
          </button>
        </div>
      </form>
    </div>
  );
};

export default BreweryInsert;
