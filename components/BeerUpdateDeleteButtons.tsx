'use client';

import { createClient } from '@/lib/utils/supabase/client';
import { useRouter } from 'next/navigation';

const UpdateDeleteButtons = ({ beerId }: { beerId: string }) => {
  const router = useRouter();

  const supabase = createClient();

  const handleUpdate = () => {
    router.push(`/beer/${beerId}/update`);
  };

  const handleDelete = async () => {
    if (window.confirm('本当に削除しますか？')) {
      const { error } = await supabase
        .from('products')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', beerId);

      if (error) {
        console.error('Error deleting beer:', error);
      } else {
        router.push('/beer');
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
