//все импорты
import "./pages/index.css";

import { openModal, closeModal } from "./scripts/modal.js";

import { createCard, deleteCard, likeCard } from "./scripts/card.js";

import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "./scripts/validation.js";

import {
  getInitialCards,
  getUserInformation,
  editProfileData,
  createCardPopup,
  editProfileAvatarPopup,
} from "./scripts/api.js";

//поиск DOM элементов
const placesList = document.querySelector(".places__list");

const btnEditProfile = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");

const btnAddNewCard = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");

const btnPopupCloses = document.querySelectorAll(".popup__close");

const profileForm = document.forms["edit-profile"];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__description");

const formNewPlace = document.forms["new-place"];
const namePlaceInput = formNewPlace["place-name"];
const photoLinkPlace = formNewPlace["link"];

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

const popups = document.querySelectorAll(".popup");

const formEditProfileAvatar = document.forms["edit-profile-avatar"];
const photoLinkAvatar = formEditProfileAvatar["link-avatar"];

const popupTypeEditProfileImage = document.querySelector(".popup_type_edit-profile");

const profileImage = document.querySelector(".profile__image");

//вызов функции валидации форм
enableValidation(validationConfig);

//обработчик события открытия попапа редактирования профиля
btnEditProfile.addEventListener("click", () => {
  const nameProfileData = nameProfile.textContent;
  const editName = profileForm.elements.name;
  editName.value = nameProfileData;

  const jogProfileData = jobProfile.textContent;
  const editJob = profileForm.elements.description;
  editJob.value = jogProfileData;

  openModal(popupTypeEdit);

  clearValidation(profileForm, validationConfig);
});

//функция попапа редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  toggleButtonState(profileForm, true);

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  editProfileData(nameValue, jobValue)
    .then(() => {
      nameProfile.textContent = nameValue;
      jobProfile.textContent = jobValue;

      closeModal(popupTypeEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      toggleButtonState(profileForm, false);
    });
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

//обработчик события открытия попапа создания карточки
btnAddNewCard.addEventListener("click", () => {
  openModal(popupTypeNewCard);
  
  clearValidation(formNewPlace, validationConfig);
});

//функция попапа создания карточки
function handleFormSubmitNewPlace(evt) {
  evt.preventDefault();

  toggleButtonState(formNewPlace, true);

  const nameValue = namePlaceInput.value;
  const placeValue = photoLinkPlace.value;

  createCardPopup(nameValue, placeValue)
    .then((data) => {
      const userId = data.owner._id;
      placesList.prepend(
        createCard(data, deleteCard, likeCard, openModalImage, userId)
      );
      closeModal(popupTypeNewCard);
      formNewPlace.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      toggleButtonState(formNewPlace, false);
    });
}

formNewPlace.addEventListener("submit", handleFormSubmitNewPlace);

//обработчик открытия попапа редактирования аватара профиля
profileImage.addEventListener("click", () => {
  clearValidation(formEditProfileAvatar, validationConfig);
  
  openModal(popupTypeEditProfileImage);
});

//функция редактирования аватара профиля
function handleFormSubmitEditAvatar(evt) {
  evt.preventDefault();

  toggleButtonState(formEditProfileAvatar, true);

  const linkAvatar = photoLinkAvatar.value;

  editProfileAvatarPopup(linkAvatar)
    .then(() => {
      profileImage.style.backgroundImage = `url('${linkAvatar}')`;

      closeModal(popupTypeEditProfileImage);
      formEditProfileAvatar.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      toggleButtonState(formEditProfileAvatar, false);
    });
}

formEditProfileAvatar.addEventListener("submit", handleFormSubmitEditAvatar);

//функция открытия попапа с картинкой
function openModalImage(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openModal(popupTypeImage);
}

//обработчик события закрытия попапа
btnPopupCloses.forEach((button) => {
  button.addEventListener("click", () => {
    closeModal(button.closest(".popup_is-opened"));
  });
});

//анимированный попап
popups.forEach((evt) => {
  evt.classList.add("popup_is-animated");
});

//функция изменения текста при сохранении при отправке формы
function toggleButtonState(form, isLoading) {
  const btnSave = form.querySelector(".popup__button");
  if (isLoading) {
    btnSave.textContent = "Сохранение...";
  } else {
    btnSave.textContent = "Сохранить";
  }
  btnSave.disabled = isLoading;
}

//загрузка данных пользователя и карточек для отображения
Promise.all([getUserInformation(), getInitialCards()])
  .then(([userData, cardsData]) => {
    //userData содержит информацию о пользователе, cardsData - о карточках
    nameProfile.textContent = userData.name;
    jobProfile.textContent = userData.about;
    profileImage.style.backgroundImage = `url('${userData.avatar}')`;

    //Отображаем карточки
    cardsData.forEach((card) => {
      const cardElement = createCard(
        card,
        deleteCard,
        likeCard,
        openModalImage,
        userData._id
      );
      placesList.appendChild(cardElement);
    });
  })
  .catch((err) => {
    console.log(err);
  });
