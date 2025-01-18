'use client';

import { useRouter } from 'next/navigation';

const UpdateDeleteButtons = ({ breweryId }: { breweryId: string }) => {
  const router = useRouter();

  const handleUpdate = () => {
    // 更新ページへ遷移 (例: /brewery/[id]/update)
    router.push(`/brewery/${breweryId}/update`);
  };

  const handleDelete = async () => {
    // 削除処理を実行 (Supabaseのdelete()を使用)
    // ...
    // 削除後、一覧ページへリダイレクト (例: /brewery)
    router.push('/brewery');
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
