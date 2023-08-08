import React from 'react';
import { Link, useLocation } from "react-router-dom";
import logo from '../images/logo.svg';

function Header({onLogout}) {
  const location = useLocation();
  return (
    <header className="header">
      <img src={logo} className="logo" alt="Логотип" />
      {location.pathname === "/" && (
        <div className="header__wrapper">
          <p className="header__email">example@mail.ru</p>
          <Link className="header__link-logout" to="/sign-in" onClick={onLogout}>
            Выйти
          </Link>
        </div>
      )}
      {location.pathname === "/sign-in" && (
        <Link className="header__link" to="/sign-up">
          Регистрация
        </Link>
      )}
      {location.pathname === "/sign-up" && (
        <Link className="header__link" to="/sign-in">
          Войти
        </Link>
      )}
    </header>
  );
}

export default Header;