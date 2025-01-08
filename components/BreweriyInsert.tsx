'use client';

import type { BreweryFormData } from '@/types/types';
import { useState } from 'react';
import { insertBreweryData } from '../lib/utils/insertBreweryData';

const BreweryInsert = () => {
  const [formData, setFormData] = useState<BreweryFormData>({
    name: '',
    region: '',
    description: '',
  });
  const [error, setError] = useState('');

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      const formData = new FormData(e.currentTarget);
      for (const [key, value] of Object.entries(formData)) {
        console.log(key, value);
      }
      await insertBreweryData(formData);
      alert('ブルワリーを追加しました！');
      setFormData({
        name: '',
        region: '',
        description: '',
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred.');
      }
      console.error('Error submitting form:', error);
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
              required
            />
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
