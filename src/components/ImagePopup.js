import React from "react";
import { usePopupClose } from "../hooks/usePopupClose";

function ImagePopup({ card, onClose }) {

  usePopupClose(card?.link, onClose);

  return (
    <section className={`popup popup_overlay_dark ${card ? "popup_opened" : ""}`}>
      {card && (
        <div className="popup__container_type_image">
          <figure className="popup__figure">
            <button className="popup__close-btn opacity" type="button" onClick={onClose} />
            <img className="popup__photo" src={card.link} alt={card.name} />
            <figcaption className="popup__caption">{card.name}</figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}

export default ImagePopup;