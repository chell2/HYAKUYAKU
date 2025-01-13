'use client';

import { useState } from 'react';
import { openModal } from '@/lib/utils/openModal';
import { closeModal } from '@/lib/utils/closeModal';

interface ModalButtonProps {
  buttonTitle: string;
  children: React.ReactNode;
}

export const ModalButton: React.FC<ModalButtonProps> = ({
  buttonTitle,
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    openModal();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    closeModal();
  };

  return (
    <>
      <div className="flex justify-end pb-10">
        <button className="btn" onClick={handleOpenModal}>
          {buttonTitle}
        </button>
      </div>
      {isModalOpen && (
        <dialog id="my_modal" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <button
              className="btn btn-md btn-circle btn-ghost absolute right-2 top-2"
              onClick={handleCloseModal}
            >
              ✕
            </button>
            <p className="grid justify-items-center py-4">{children}</p>
          </div>
        </dialog>
      )}
    </>
  );
};
