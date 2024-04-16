//все импорты
import './pages/index.css';

import { initialCards } from './scripts/cards.js';

import { openModal, closeModal } from './scripts/modal.js';

import { createCard, deleteCard, likeCard } from './scripts/card.js';

//поиск DOM элементов
const cardTemplate = document.querySelector('#card-template').content;

const placesList = document.querySelector('.places__list');

const btnEditProfile = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');

const btnAddNewCard = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');

const btnPopupClose = document.querySelectorAll('.popup__close');

const formElement = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__description');

const formNewPlace = document.forms['new-place'];
const namePlaceInput = document.forms['new-place']['place-name'];
const photoLinkPlace = document.forms['new-place']['link'];

const popupAnimation = document.querySelectorAll('.popup');

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

//функция обработчик события открытия попапа создания карточки
btnAddNewCard.addEventListener('click', () => {
  openModal(popupTypeNewCard);
});

//функция обработчик события открытия попапа редактирования профиля
btnEditProfile.addEventListener('click', () => {
  const nameProfileData = nameProfile.textContent;
  const editName = formElement.elements.name;
  editName.value = nameProfileData;
 
  const jogProfileData = jobProfile.textContent;
  const editJob = formElement.elements.description;
  editJob.value = jogProfileData;

  openModal(popupTypeEdit);
});

//функция обработчик события закрытия попапа
btnPopupClose.forEach((button) => {
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

  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = placeValue;
  cardElement.querySelector('.card__image').alt = nameValue;
  cardElement.querySelector('.card__title').textContent = nameValue;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });

  const btnLike = cardElement.querySelector('.card__like-button');
  btnLike.addEventListener('click', likeCard);

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.addEventListener('click', () => {
    openModalImage(placeValue, nameValue);
  });

  placesList.prepend(cardElement);

  closeModal(popupTypeNewCard);
  formNewPlace.reset();
}

formNewPlace.addEventListener('submit', handleFormSubmitNewPlace);

//функция открытия попапа с картинкой
function openModalImage(link, name) {
  const popupTypeImage = document.querySelector('.popup_type_image');
  const popupImage = popupTypeImage.querySelector('.popup__image');
  const popupCaption = popupTypeImage.querySelector('.popup__caption');

  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openModal(popupTypeImage);
}

//анимированный попап
popupAnimation.forEach((evt) => {
  evt.classList.add('popup_is-animated');
});

//вызов функции вывода карточек на страницу из массива
renderInitialCards(initialCards);
