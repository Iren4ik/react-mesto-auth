import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ isOpen, onClose, isPreloading, card, onCardDelete, }) {

  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(card);
  }

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      btnText={isPreloading ? "Удаление..." : "Удалить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default DeleteCardPopup;