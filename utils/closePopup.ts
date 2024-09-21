export const closePopup = (backdrop: HTMLDivElement, popup: HTMLDivElement) => {
  popup.remove();
  backdrop.remove();
};
