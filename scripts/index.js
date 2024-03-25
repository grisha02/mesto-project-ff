// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function createCards(data, deleteCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__image').src = data.link;
  cardElement.querySelector('.card__image').alt = data.name;
  cardElement.querySelector('.card__title').textContent = data.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {
    deleteCallback(cardElement);
  });

  return cardElement;
}

function renderInitialCards(initialCards) {
  const placesList = document.querySelector('.places__list');

  initialCards.forEach(data => {
    const cardElement = createCards(data, deleteCallback);
    placesList.appendChild(cardElement);
  });
}

function deleteCallback(cardElement) {
  cardElement.remove();
}

renderInitialCards(initialCards);

// КОД, КОТОРЫЙ ОТОБРАЖАЕТ КАРТОЧКИ БЕЗ УДАЛЕНИЯ
// ПРОСТО ДЛЯ СЕБЯ
// function createCards(data) {
//   const cardTemplate = document.querySelector('#card-template').content;
//   const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

//   cardElement.querySelector('.card__image').src = data.link;
//   cardElement.querySelector('.card__image').alt = data.name;
//   cardElement.querySelector('.card__title').textContent = data.name;

//   return cardElement;
// }

// function renderInitialCards(initialCards) {
//   const placesList = document.querySelector('.places__list');

//   initialCards.forEach(data => {
//     const cardElement = createCards(data);
//     placesList.appendChild(cardElement);
//   });
// }

// renderInitialCards(initialCards);
