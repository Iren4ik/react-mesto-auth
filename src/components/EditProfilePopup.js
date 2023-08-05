import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isPreloading }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-form"
      title="Редактировать профиль"
      btnText={isPreloading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__input-element">
        <input
          className="popup__input popup__input_type_name"
          id="name"
          type="text"
          name="username"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
          value={name || ''}
          onChange={handleChangeName}
        />
        <span className="name-error popup__error"></span>
      </label>
      <label className="popup__input-element">
        <input
          className="popup__input popup__input_type_job"
          id="job"
          type="text"
          name="job"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required
          value={description || ''}
          onChange={handleChangeDescription}
        />
        <span className="job-error popup__error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
