import { usePopupClose } from "../hooks/usePopupClose";
import successRegister from "../images/success-register.svg";
import errorRegister from "../images/error-register.svg";

function InfoTooltip({isOpen, onClose, isConfirmed}) {

  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup popup_overlay_light ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close-btn opacity" type="button" onClick={onClose}/>
        <img 
          className="popup__tootltip-img" 
          alt={isConfirmed ? "Галочка" : "Крестик"}
          src={isConfirmed ? successRegister : errorRegister} />
        <h2 className="popup__tootltip-header">
          {isConfirmed ? "Вы успешно зарегистрировались" : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;