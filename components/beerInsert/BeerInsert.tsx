'use client';

import type { Brewery } from '@/types/types';
import { useEffect, useState } from 'react';
import { insertProductData } from './insertProductData';
import { getBreweries } from './getBreweries';

const BeerInsert = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    abv: '',
    ibu: '',
    volume: '',
    style: '',
    fermentation: '',
    hops: '',
    malts: '',
    brewery_id: '',
  });
  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        const data = await getBreweries();
        setBreweries(data);
      } catch (error) {
        console.error('Error fetching breweries:', error);
        setError('ブルワリーのデータ取得に失敗しました。');
      } finally {
        setLoading(false);
      }
    };
    fetchBreweries();
  }, []);

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
      await insertProductData(formData);
      alert('商品を追加しました！');
      setFormData({
        name: '',
        description: '',
        abv: '',
        ibu: '',
        volume: '',
        style: '',
        fermentation: '',
        hops: '',
        malts: '',
        brewery_id: '',
      });
    } catch (error: any) {
      setError(error.message);
      console.error('Error submitting form:', error);
    }
  };

  if (loading) {
    return <p>ブルワリーデータを読み込み中...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4">商品追加フォーム</h1>
        <div className="grid grid-cols-1 gap-4 pb-4">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">商品名</span>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-4">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">ブルワリー</span>
            </label>
            <select
              className="select select-bordered w-full max-w-xs"
              name="brewery_id"
              value={formData.brewery_id}
              onChange={handleChange}
            >
              <option value="">選択してください</option>
              {breweries.map((brewery) => (
                <option key={brewery.id} value={brewery.id}>
                  {brewery.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">スタイル</span>
            </label>
            <input
              type="text"
              name="style"
              value={formData.style}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">発酵方法</span>
            </label>
            <select
              className="select select-bordered w-full max-w-xs"
              name="fermentation"
              value={formData.fermentation}
              onChange={handleChange}
            >
              <option value="">選択してください</option>
              <option value="top">上面発酵</option>
              <option value="bottom">下面発酵</option>
              <option value="other">その他</option>
            </select>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">容量(ml)</span>
            </label>
            <input
              type="number"
              name="volume"
              value={formData.volume}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">ABV</span>
            </label>
            <input
              type="text"
              name="abv"
              value={formData.abv}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">IBU</span>
            </label>
            <input
              type="number"
              name="ibu"
              value={formData.ibu}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">ホップ</span>
            </label>
            <input
              type="text"
              name="hops"
              value={formData.hops}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">モルト</span>
            </label>
            <input
              type="text"
              name="malts"
              value={formData.malts}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
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

export default BeerInsert;
