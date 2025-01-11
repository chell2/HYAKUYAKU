'use client';

import { useState } from 'react';
import BeerInsert from './BeerInsert';
import { openModal } from '@/lib/utils/openModal';
import { closeModal } from '@/lib/utils/closeModal';

export const ModalButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    openModal(); // openModal関数を実行
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    closeModal(); // closeModal関数を実行
  };

  return (
    <>
      <div className="flex justify-end pb-10">
        <button className="btn" onClick={handleOpenModal}>
          商品を追加する
        </button>
      </div>
      {/* モーダルを条件付きでレンダリング */}
      {isModalOpen && (
        <dialog id="my_modal" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <button
              className="btn btn-md btn-circle btn-ghost absolute right-2 top-2"
              onClick={handleCloseModal}
            >
              ✕
            </button>
            <p className="grid justify-items-center py-4">
              <BeerInsert />
            </p>
          </div>
        </dialog>
      )}
    </>
  );
};
