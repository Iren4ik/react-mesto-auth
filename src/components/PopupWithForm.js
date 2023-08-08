import React from "react";
import { usePopupClose } from "../hooks/usePopupClose";

function PopupWithForm({ name, title, children, btnText, isOpen, onClose, onSubmit, isDisabled }) {

  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup popup_overlay_light popup_feat_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className={`popup__container popup__container_type_${name}`}>
        <button className="popup__close-btn opacity" type="button" onClick={onClose} />
        <h2 className={`popup__header popup__header_${name}`}>{title}</h2>
        <form className={`form popup__input-container popup__input-container_type_${name}`} name={name} onSubmit={onSubmit} noValidate>
          {children}
          <input 
            className={isDisabled ? `popup__save-btn popup__save-btn_${name} popup__save-btn_disabled` : `popup__save-btn popup__save-btn_${name}`} 
            type="submit" 
            value={btnText} 
            disabled={isDisabled}
          />
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;