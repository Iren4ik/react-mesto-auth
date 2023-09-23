import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onTrashClick, cards }) {

  // Подписываемся на контекст CurrentUserContext
  // React.useContext возвращает значение контекста, которое передано в пропс value провайдера
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <button className="profile__avatar-btn" onClick={onEditAvatar}>
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt={currentUser.name}
            />
          </button>
          <div className="profile__intro">
            <div className="profile__intro-name-container">
              <h1 className="profile__intro-name">{currentUser.name}</h1>
              <button
                className="profile__intro-edit-btn opacity"
                type="button"
                aria-label="Редактировать"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__intro-job">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-btn opacity"
          type="button"
          aria-label="Добавить"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__items">
          {/* Для каждой карточки из массива cards вставляем разметку компонента Card*/}
          {cards.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onTrashClick={onTrashClick}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
