import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormWithValidation } from "../hooks/useFormWithValidation";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isPreloading }) {

  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();

  React.useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values);
  }

  return (
    <PopupWithForm
      name="add-cards"
      title="Новое место"
      btnText={isPreloading ? "Сохранение..." : "Создать"}
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
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          value={values.name || ""}
          onChange={handleChange}
        />
        <span className="popup__error popup__error_visible">{errors.name}</span>
      </label>
      <label className="popup__input-element">
        <input
          className={
            errors.link ? "popup__input popup__input_valid_error" : "popup__input"
          }
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required
          value={values.link || ""}
          onChange={handleChange}
        />
        <span className="popup__error popup__error_visible">{errors.link}</span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
