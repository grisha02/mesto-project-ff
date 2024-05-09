//все импорты
import { checkResponse } from "./utils.js";

//конфиг запроса к серверу
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-13",
  headers: {
    authorization: "eb139a18-e29d-4a3a-8ab5-b4e4371081dd",
    "Content-Type": "application/json",
  },
};

//запрос на получение данных карточкек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
};

//запрос на получание данных пользователя
export const getUserInformation = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);
};

//запрос на редактирование профиля
function editProfileData(nameProfile, jobProfile) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameProfile,
      about: jobProfile,
    }),
  }).then(checkResponse);
}

//запрос на создание карточки
function createCardPopup(namePlace, linkPlace) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: namePlace,
      link: linkPlace,
    }),
  }).then(checkResponse);
}

//запрос на удаление карточки
function deleteMyCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

//запрос на постановку лайка
function putLikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponse);
}

//запрос на удаление лайка
function deleteLikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

//запрос на редактирования аватара профиля
function editProfileAvatarPopup(linkAvatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: linkAvatar,
    }),
  }).then(checkResponse);
}

export {
  editProfileData,
  createCardPopup,
  deleteMyCard,
  putLikeCard,
  deleteLikeCard,
  editProfileAvatarPopup,
};
