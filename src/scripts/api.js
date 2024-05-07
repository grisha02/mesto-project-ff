//конфиг запроса к серверу
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-13',
  headers: {
    authorization: 'eb139a18-e29d-4a3a-8ab5-b4e4371081dd',
    'Content-Type': 'application/json'
  }
}

//запрос на получение данных карточкек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

//запрос на получание данных пользователя
export const getUserInformation = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

//запрос на редактирование профиля
function popupEditProfile(nameProfile, jobProfile) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameProfile,
      about: jobProfile
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

//запрос на создание карточки
function popupCreateCard(namePlace, linkPlace) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: namePlace,
      link: linkPlace
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
        // console.log(res.json());
      } 

      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    });
}

//запрос на удаление карточки
function popupDeleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
        // console.log(res.json());
      } 

      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    });
}

//запрос на постановку лайка
function putLikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
        // console.log(res.json());
      } 

      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    });
}

//запрос на удаление лайка
function deleteLikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
        // console.log(res.json());
      } 

      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    });
}

//запрос на редактирования аватара профиля
function popupEditProfileAvatar(linkAvatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: linkAvatar,
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export { popupEditProfile, popupCreateCard, popupDeleteCard, putLikeCard, deleteLikeCard, popupEditProfileAvatar }
