//все импорты
import './pages/index.css';

import { openModal, closeModal, closeModalOnClickOverlay } from './scripts/modal.js';

import { createCard, deleteCard, likeCard } from './scripts/card.js';

import { enableValidation, clearValidation, validationConfig } from './scripts/validation.js';

import { getInitialCards, getUserInformation, popupEditProfile, popupCreateCard, popupEditProfileAvatar } from './scripts/api.js';

//поиск DOM элементов
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

const formEditProfileAvatar = document.forms['edit-profile-avatar'];
const photoLinkAvatar = document.forms['edit-profile-avatar']['link-avatar'];
const popupTypeEditProfileImage = document.querySelector('.popup_type_edit-profile');

const profileImage = document.querySelector('.profile__image');

//обработчик события открытия попапа редактирования профиля
btnEditProfile.addEventListener('click', () => {
  clearValidation(formElement, validationConfig);

  const nameProfileData = nameProfile.textContent;
  const editName = formElement.elements.name;
  editName.value = nameProfileData;
 
  const jogProfileData = jobProfile.textContent;
  const editJob = formElement.elements.description;
  editJob.value = jogProfileData;

  openModal(popupTypeEdit);
  
  enableValidation(validationConfig);
});

//функция попапа редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault();

  toggleButtonState(formElement, true);

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  popupEditProfile(nameValue, jobValue)
    .then(() => {
      toggleButtonState(formElement, false);

      nameProfile.textContent = nameValue;
      jobProfile.textContent = jobValue;

      closeModal(popupTypeEdit);
    })
    .catch((err) => {
      console.log(err);
      toggleButtonState(formElement, false);
    });
}

formElement.addEventListener('submit', handleFormSubmit);

//обработчик события открытия попапа создания карточки
btnAddNewCard.addEventListener('click', () => {
  openModal(popupTypeNewCard);

  enableValidation(validationConfig);
});

//функция попапа создания карточки
function handleFormSubmitNewPlace(evt) {
  evt.preventDefault();

  toggleButtonState(formNewPlace, true);

  const nameValue = namePlaceInput.value;
  const placeValue = photoLinkPlace.value;

  getUserInformation()
    .then(userData => {
      popupCreateCard(nameValue, placeValue)
        .then(data => {
          toggleButtonState(formNewPlace, false);

          placesList.prepend(createCard(data, deleteCard, likeCard, openModalImage, userData._id));
          closeModal(popupTypeNewCard);
          formNewPlace.reset();
        })
        .catch(err => {
          console.log('Произошла ошибка при создании карточки:', err);
          toggleButtonState(formNewPlace, false);
        });
    })
    .catch(err => {
      console.log(err);
      toggleButtonState(formNewPlace, false);
    });
}

formNewPlace.addEventListener('submit', handleFormSubmitNewPlace);

//обработчик открытия попапа редактирования аватара профиля
profileImage.addEventListener('click', () => {
  getUserInformation()
    .then((userData) => {
      photoLinkAvatar.value = userData.avatar;

      clearValidation(formEditProfileAvatar, validationConfig);
    });

  openModal(popupTypeEditProfileImage);

  enableValidation(validationConfig);
});

//функция редактирования аватара профиля
function handleFormSubmitEditAvatar(evt) {
  evt.preventDefault();

  toggleButtonState(formEditProfileAvatar, true);

  const linkAvatar = photoLinkAvatar.value;

  popupEditProfileAvatar(linkAvatar)
   .then(() => {
     toggleButtonState(formEditProfileAvatar, false);

     profileImage.style.backgroundImage = `url('${linkAvatar}')`;

     closeModal(popupTypeEditProfileImage);
   })
   .catch((err) => {
     console.log(err);
     toggleButtonState(formEditProfileAvatar, false);
   });
}

formEditProfileAvatar.addEventListener('submit', handleFormSubmitEditAvatar);

//функция открытия попапа с картинкой
function openModalImage(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openModal(popupTypeImage);
}

//обработчик события закрытия попапа
btnPopupCloses.forEach((button) => {
  button.addEventListener('click', () => {
    closeModal(button.closest('.popup_is-opened'));
  });
});

//анимированный попап
popupAnimations.forEach((evt) => {
  evt.classList.add('popup_is-animated');
});

//вызов функции закрытия модального окна кликом на оверлей
closeModalOnClickOverlay();

//функция изменения текста при сохранении при отправке формы
function toggleButtonState(form, isLoading) {
  const btnSave = form.querySelector('.popup__button');
  if (isLoading) {
    btnSave.textContent = 'Сохранение...';
  } else {
    btnSave.textContent = 'Сохранить';
  }
  btnSave.disabled = isLoading;
}

//загрузка данных пользователя и карточек для отображения
Promise.all([
  getUserInformation(), getInitialCards()
])
.then(([userData, cardsData]) => {
  //userData содержит информацию о пользователе, cardsData - о карточках
  nameProfile.textContent = userData.name;
  jobProfile.textContent = userData.about;
  profileImage.style.backgroundImage = `url('${userData.avatar}')`;

  //Отображаем карточки
  cardsData.forEach(card => {
      const cardElement = createCard(card, deleteCard, likeCard, openModalImage, userData._id);
      placesList.appendChild(cardElement);
  });
})
.catch(err => {
  console.log(err);
});
