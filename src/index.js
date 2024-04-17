//все импорты
import './pages/index.css';

import { initialCards } from './scripts/cards.js';

import { openModal, closeModal, closeModalOnClickOverlay } from './scripts/modal.js';

import { createCard, deleteCard, likeCard } from './scripts/card.js';

//поиск DOM элементов
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const btnEditProfile = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');

const btnAddNewCard = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');

const btnPopupCloses = document.querySelectorAll('.popup__close');

const formElement = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__description');

const formNewPlace = document.forms['new-place'];
const namePlaceInput = document.forms['new-place']['place-name'];
const photoLinkPlace = document.forms['new-place']['link'];

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

const popupAnimations = document.querySelectorAll('.popup');

//все экспорты
export {
  cardTemplate,
}

//функция вывода карточек на страницу из массива
function renderInitialCards(initialCards) {
  initialCards.forEach(data => {
    const cardElement = createCard(data, deleteCard, likeCard, openModalImage);
    placesList.appendChild(cardElement);
  });
}

//обработчик события открытия попапа создания карточки
btnAddNewCard.addEventListener('click', () => {
  openModal(popupTypeNewCard);
});

//обработчик события открытия попапа редактирования профиля
btnEditProfile.addEventListener('click', () => {
  const nameProfileData = nameProfile.textContent;
  const editName = formElement.elements.name;
  editName.value = nameProfileData;
 
  const jogProfileData = jobProfile.textContent;
  const editJob = formElement.elements.description;
  editJob.value = jogProfileData;

  openModal(popupTypeEdit);
});

//обработчик события закрытия попапа
btnPopupCloses.forEach((button) => {
  button.addEventListener('click', () => {
    closeModal(button.closest('.popup_is-opened'));
  });
});

//функция попапа редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  nameProfile.textContent = nameValue;
  jobProfile.textContent = jobValue;

  closeModal(popupTypeEdit);
}

formElement.addEventListener('submit', handleFormSubmit);

//функция попапа создания карточки
function handleFormSubmitNewPlace(evt) {
  evt.preventDefault();

  const nameValue = namePlaceInput.value;
  const placeValue = photoLinkPlace.value;
  const data = {
    name: nameValue,
    link: placeValue
  };

  placesList.prepend(createCard(data, deleteCard, likeCard, openModalImage));

  closeModal(popupTypeNewCard);
  formNewPlace.reset();
}

formNewPlace.addEventListener('submit', handleFormSubmitNewPlace);

//функция открытия попапа с картинкой
function openModalImage(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openModal(popupTypeImage);
}

//анимированный попап
popupAnimations.forEach((evt) => {
  evt.classList.add('popup_is-animated');
});

//вызов функции вывода карточек на страницу из массива
renderInitialCards(initialCards);

//вызов функции закрытия модального окна кликом на оверлей
closeModalOnClickOverlay();
