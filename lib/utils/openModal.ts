export const openModal = () => {
  const modal = document.getElementById('my_modal') as HTMLDialogElement | null;
  if (modal) {
    modal.showModal();
  }
};
