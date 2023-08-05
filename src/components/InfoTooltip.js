import "./styles/InfoTooltip.css";
import { usePopupClose } from "../hooks/usePopupClose";
import successRegister from "../images/success-register.svg";
// import errorRegister from "../images/error-register.svg";

function InfoTooltip({isOpen, onClose}) {

  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup popup_overlay_light ${isOpen ? "popup_opened" : ""}`}>
    {/* // <div className='popup popup_overlay_light popup_opened'> */}
      <div className="popup__container">
        <button className="popup__close-btn opacity" type="button" onClick={onClose}/>
        <img className="popup__tootltip-img" src={successRegister} />
        <h2 className="popup__tootltip-header">
          Вы успешно зарегистрировались
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;