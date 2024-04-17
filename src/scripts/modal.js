//функция открытия модального окна
const openModal = (modalElement) => {
  modalElement.classList.add('popup_is-opened');

  document.addEventListener('keydown', closeModalOnEsc);
}

//функция закрытия модального окна
const closeModal = (modalElement) => {
  modalElement.classList.remove('popup_is-opened');

  document.removeEventListener('keydown', closeModalOnEsc);
}

//функция закрытия модального окна на Esc
const closeModalOnEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openedModal = document.querySelector('.popup_is-opened');
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

//функция закрытия модального окна кликом на оверлей
function closeModalOnClickOverlay(){
  document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
      closeModal(evt.target);
    }
  });
}

//все экспорты
export {
  openModal,
  closeModal,
  closeModalOnClickOverlay
}
