export const closeModal = () => {
  const modal = document.getElementById('my_modal') as HTMLDialogElement | null;
  if (modal) {
    modal.close();
  }
};
