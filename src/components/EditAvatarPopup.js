import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormWithValidation } from "../hooks/useFormWithValidation";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isPreloading }) {

  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(values);
  }

  React.useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      btnText={isPreloading ? 'Сохранение...' : 'Сохранить'}
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
          type="url"
          name="avatar"
          placeholder="Ссылка на картинку"
          required
          onChange={handleChange}
          value={values.avatar || ""}
        />
        <span className="popup__error popup__error_visible">{errors.avatar}</span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;