'use client';

import { createClient } from '@/lib/utils/supabase/client';
import { useRouter } from 'next/navigation';

const UpdateDeleteButtons = ({ breweryId }: { breweryId: string }) => {
  const router = useRouter();

  const supabase = createClient();

  const handleUpdate = () => {
    router.push(`/brewery/${breweryId}/update`);
  };

  const handleDelete = async () => {
    if (window.confirm('本当に削除しますか？')) {
      const { error } = await supabase
        .from('breweries')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', breweryId);

      if (error) {
        console.error('Error deleting brewery:', error);
      } else {
        router.push('/brewery');
      }
    }
  };

  return (
    <div>
      <button className="btn btn-secondary px-8" onClick={handleUpdate}>
        更　新
      </button>
      <button className="btn btn-outline btn-error ml-4" onClick={handleDelete}>
        削　除
      </button>
    </div>
  );
};

export default UpdateDeleteButtons;
