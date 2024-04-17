//все импорты
import { cardTemplate } from '..';

//функция создания карточки
export function createCard(data, deleteCard, likeCard, openModalImage) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const btnLike = cardElement.querySelector('.card__like-button');

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });

  btnLike.addEventListener('click', likeCard);

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
export function likeCard(evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
}
