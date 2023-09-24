import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onTrashClick }) {
  // Подписываемся на контекст CurrentUserContext
  // React.useContext возвращает значение контекста, которое передано в пропс value провайдера
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  // const isOwn = card.owner._id === currentUser._id;
  const isOwn = card.owner === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  // const isLiked = card.likes.some((card) => card._id === currentUser._id);
  const isLiked = card.likes.some((card) => card === currentUser._id);

  // Создаём переменную, которую зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `elements__like ${isLiked && 'elements__like_active'}`
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleTrashClick() {
    onTrashClick(card)
  }

  // Далее в разметке используем переменную для условного рендеринга
  return (
    <li className="elements__element">
      {isOwn && <button className="elements__trash opacity" type="button" onClick={handleTrashClick} />}
      <img className="elements__photo opacity" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="elements__caption">
        <h2 className="elements__place">{card.name}</h2>
        <div className="elements__like-container">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} />
          <p className="elements__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;