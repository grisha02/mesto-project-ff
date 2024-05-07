//все импорты
import { popupDeleteCard, putLikeCard, deleteLikeCard } from './api.js';

//функция создания карточки
export function createCard(data, deleteCard, likeCard, openModalImage, userId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const btnLike = cardElement.querySelector('.card__like-button');

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikes = cardElement.querySelector('.card__like-count');

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  cardLikes.textContent = data.likes.length;

  //data._id        айди карточки
  //data.owner._id  айди создателя карточки
  if (data.owner._id === userId) {
    deleteButton.style.display = 'block';
  } else {
    deleteButton.style.display = 'none';
  }

  const userLiked = data.likes.some(like => like._id === userId);
  if (userLiked) {
    btnLike.classList.add('card__like-button_is-active');
  }

  deleteButton.addEventListener('click', () => {
    popupDeleteCard(data._id);
    deleteCard(cardElement);
  });

  btnLike.addEventListener('click', () => {
    likeCard(data._id, btnLike, cardLikes);
  });

  cardImage.addEventListener('click', () => {
    openModalImage(data.link, data.name);
  });

  return cardElement;
}

//функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}

//функция лайка карточки
export function likeCard(cardId, btnLike, cardLikes) {
  const isLiked = btnLike.classList.contains('card__like-button_is-active');

  let likeCount = parseInt(cardLikes.textContent);
  if (isLiked) {
    deleteLikeCard(cardId)
      .then(() => {
        btnLike.classList.remove('card__like-button_is-active');
        likeCount--;
        cardLikes.textContent = likeCount.toString();
      })
      .catch(err => {
        console.log('Ошибка при удалении лайка:', err);
      });
  } else {
    putLikeCard(cardId)
      .then(() => {
        btnLike.classList.add('card__like-button_is-active');
        likeCount++;
        cardLikes.textContent = likeCount.toString();
      })
      .catch(err => {
        console.log('Ошибка при добавлении лайка:', err);
      });
  }
}
