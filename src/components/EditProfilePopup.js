import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormWithValidation } from "../hooks/useFormWithValidation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isPreloading }) {

  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (currentUser) {
      resetForm(currentUser);
    }
  }, [currentUser, resetForm, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  };

  return (
    <PopupWithForm
      name="edit-form"
      title="Редактировать профиль"
      btnText={isPreloading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
    >
      <label className="popup__input-element">
        <input
          className={
            errors.name ? "popup__input popup__input_valid_error" : "popup__input"
          }
          type="text"
          name="name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
          value={values.name || ''}
          onChange={handleChange}
        />
        <span className="popup__error popup__error_visible">{errors.name}</span>
      </label>

      <label className="popup__input-element">
        <input
          className={
            errors.about ? "popup__input popup__input_valid_error" : "popup__input"
          }
          type="text"
          name="about"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required
          value={values.about || ''}
          onChange={handleChange}
        />
        <span className="popup__error popup__error_visible">{errors.about}</span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
