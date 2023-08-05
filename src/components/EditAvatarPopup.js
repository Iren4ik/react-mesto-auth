import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isPreloading }) {
  // записываем в переменную объект, возвращаемый хуком. Он содержит единственное поле - current
  //в это поле Реакт запишет указатель на DOM-элемент, когда будет формировать DOM -дерево
  const avatarRef = React.useRef();

  //Вызываем метод value на поле current объекта
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = null;
  }, [isOpen]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      btnText={isPreloading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__input-element">
        <input
          className="popup__input popup__input_type_avatar"
          id="avatar"
          type="url"
          name="avatar"
          placeholder="Ссылка на картинку"
          required
          ref={avatarRef}
        />
        <span className="avatar-error popup__error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;