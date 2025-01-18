'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateBeer } from './actions';
import { Database } from '@/types/supabase';

type Beer = Database['public']['Tables']['products']['Row'];
type Brewery = Database['public']['Tables']['breweries']['Row'];

type UpdateBeerFormProps = {
  beer: Beer;
  breweries: Brewery[];
};

const UpdateBeerForm = ({ beer, breweries }: UpdateBeerFormProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState<Beer>({
    ...beer,
    is_bottled: beer.is_bottled || false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    setFormData({
      ...beer,
    });
  }, [beer]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;

    const updatedValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const handleArrayField = (
      existingValue: string[] | null | undefined,
      newValue: string | string[] | null | undefined
    ) => {
      if (typeof newValue === 'string') {
        if (/[、,]/.test(newValue)) {
          return newValue.split(/、|,/).map((item) => item.trim());
        } else if (newValue.trim() !== '') {
          return [newValue.trim()];
        } else {
          return []; // 空白のみの場合は空配列を返す
        }
      } else {
        return existingValue; // 変更がない場合は元の値を返す
      }
    };

    const updatedFormData = {
      ...formData,
      hops: handleArrayField(
        formData.hops as string[] | null | undefined,
        formData.hops as unknown as string
      ),
      malts: handleArrayField(
        formData.malts as string[] | null | undefined,
        formData.malts as unknown as string
      ),
      yeast: handleArrayField(
        formData.yeast as string[] | null | undefined,
        formData.yeast as unknown as string
      ),
      others: handleArrayField(
        formData.others as string[] | null | undefined,
        formData.others as unknown as string
      ),
    };

    const result = await updateBeer(updatedFormData, beer.id);

    if (result?.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      router.push(`/beer/${beer.id}`);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">更新しました！</div>}
      <div className="grid grid-cols-1 gap-2 mb-2">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">商品名</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">説明</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            required
          />
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
              checked={formData.is_bottled || false}
              onChange={handleChange}
              className="toggle toggle-primary"
            />
            瓶
          </label>
        </div>
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

export default UpdateBeerForm;
