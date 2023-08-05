import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isPreloading }) {

  const [title, setTitle] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setTitle("");
    setLink("");
  }, [isOpen]);

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: title,
      link,
    });
  }

  return (
    <PopupWithForm
      name="add-cards"
      title="Новое место"
      btnText={isPreloading ? "Сохранение..." : "Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__input-element">
        <input
          className="popup__input popup__input_type_caption"
          id="caption"
          type="text"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          value={title || ""}
          onChange={handleChangeTitle}
        />
        <span className="caption-error popup__error"></span>
      </label>
      <label className="popup__input-element">
        <input
          className="popup__input popup__input_type_link"
          id="link"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required
          value={link || ""}
          onChange={handleChangeLink}
        />
        <span className="link-error popup__error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
