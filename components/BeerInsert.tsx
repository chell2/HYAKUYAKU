'use client';

import type { Brewery, ProductFormData } from '@/types/types';
import { useEffect, useState } from 'react';
import { insertProductData } from '../lib/utils/insertProductData';
import Loading from '@/app/loading';
import ErrorPage from '@/app/error';
import { createClient } from '../lib/utils/supabase/client';

const BeerInsert = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    abv: null,
    brewery_id: '',
    description: '',
    fermentation: null,
    hops: null,
    ibu: null,
    is_bottled: false,
    malts: null,
    name: '',
    others: null,
    price: null,
    status: null,
    stock: null,
    style: null,
    volume: null,
    yeast: null,
  });
  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        const response = await fetch('/api/brewery');
        if (!response.ok) throw new Error('Failed to fetch breweries');
        const breweries = await response.json();
        setBreweries(breweries);
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
    const { name, type, value } = e.target;
    const checked =
      e.target instanceof HTMLInputElement ? e.target.checked : false;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImage = async (file: File) => {
    const filePath = `products/${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from('images')
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

      const newProductData = {
        ...formData,
        image_path: imagePath,
      };

      const formDataToSubmit = new FormData();
      Object.entries(newProductData).forEach(([key, value]) => {
        formDataToSubmit.append(key, value as string | Blob);
      });
      await insertProductData(formDataToSubmit);
      alert('商品を追加しました！');
      setFormData({
        abv: null,
        brewery_id: '',
        description: '',
        fermentation: null,
        hops: null,
        ibu: null,
        is_bottled: false,
        malts: null,
        name: '',
        others: null,
        price: null,
        status: null,
        stock: null,
        style: null,
        volume: null,
        yeast: null,
      });

      setImageFile(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred.');
      }
      console.error('Error submitting form:', error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-xl font-bold mb-4">商品追加フォーム</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
        <div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">商品名</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
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
              className="textarea textarea-bordered w-full max-w-xs min-h-32"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">商品画像</span>
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
                className="w-32 h-32 object-cover"
              />
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">販売価格</span>
          </label>
          <input
            type="number"
            name="price"
            value={formData.price || ''}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        {/* <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">在庫数(本)</span>
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock || ''}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div> */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">在庫アラート</span>
          </label>
          <select
            className="select select-bordered w-full max-w-xs"
            name="status"
            value={formData.status || ''}
            onChange={handleChange}
          >
            <option value="">未選択</option>
            <option value="在庫わずか">在庫わずか</option>
            <option value="在庫切れ">在庫切れ</option>
          </select>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">ブルワリー</span>
          </label>
          <select
            className="select select-bordered w-full max-w-xs"
            name="brewery_id"
            value={formData.brewery_id || ''}
            onChange={handleChange}
            required
          >
            <option value="">未選択</option>
            {breweries.map((brewery) => (
              <option key={brewery.id} value={brewery.id}>
                {brewery.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">発酵</span>
          </label>
          <select
            className="select select-bordered w-full max-w-xs"
            name="fermentation"
            value={formData.fermentation || ''}
            onChange={handleChange}
          >
            <option value="">未選択</option>
            <option value="top">上面発酵</option>
            <option value="bottom">下面発酵</option>
            <option value="other">その他</option>
          </select>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">スタイル</span>
          </label>
          <input
            type="text"
            name="style"
            value={formData.style || ''}
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
            value={formData.abv || ''}
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
            value={formData.ibu || ''}
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
            value={formData.hops || ''}
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
            value={formData.malts || ''}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">イースト</span>
          </label>
          <input
            type="text"
            name="yeast"
            value={formData.yeast || ''}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">その他</span>
          </label>
          <input
            type="text"
            name="others"
            value={formData.others || ''}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">容量(ml)</span>
          </label>
          <input
            type="number"
            name="volume"
            value={formData.volume || ''}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label cursor-pointer">
            <p className="label-text">容器タイプ</p>
            缶
            <input
              type="checkbox"
              name="is_bottled"
              checked={formData.is_bottled}
              onChange={handleChange}
              className="toggle toggle-primary"
            />
            瓶
          </label>
        </div>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="flex justify-end items-baseline gap-4">
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-outline btn-neutral">キャンセル</button>
          </form>
        </div>
        <div>
          <button type="submit" className="btn btn-secondary px-6">
            追　加
          </button>
        </div>
      </div>
    </form>
  );
};

export default BeerInsert;
