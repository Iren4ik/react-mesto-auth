import React from 'react';
import { Link, useLocation } from "react-router-dom";
import logo from '../images/logo.svg';
import burger from '../images/burger.svg';
import closeBtn from '../images/close-burger-menu.svg';

function Header({onLogout, email}) {

  const location = useLocation();
  const [menu, setMenu] = React.useState(false);
  const [scroll, setScroll] = React.useState(0);

  function handleOpenMenu() {
    setMenu(!menu)
  }

  function handleScroll() {
    setScroll(window.scrollY);
  };

  //При скролле вниз, меню само закрывается
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (

    <header className={
      menu && !scroll
            ? "header header_active" 
            : "header" 
    }>
      <img src={logo} className="logo" alt="Логотип" />

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

      {location.pathname === "/" && (
        <>
        <div className={
          menu && !scroll
                ? "header__wrapper header__wrapper_active" 
                : "header__wrapper" 
        }>
          <p className="header__email">{email}</p>
          <Link className="header__link-logout" to="/sign-in" onClick={onLogout}>
            Выйти
          </Link>
        </div>
        <div 
          onClick={handleOpenMenu} 
          className={
            menu && !scroll
                  ? "header__burger-container header__burger-container_active" 
                  : "header__burger-container" 
          }
        >
          {menu && !scroll
            ? <img src={closeBtn} className="header__burger" alt="Знак закрытия меню" />
            : <img src={burger} className="header__burger" alt="Знак меню" />
          }
        </div>
      </>
      )}

    </header>
  );
}

export default Header;