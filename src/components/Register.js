import React from "react";
import { Link } from "react-router-dom";
import "./styles/Authorization.css";

function Register() {
  return (
    <main className="content">
      <div className="authorization">
        <p className="authorization__welcome">Регистрация</p>
        <form className="authorization__form">
          <input
            required
            className="authorization__input"
            id="username"
            name="username"
            type="text"
            value=""
            placeholder="Email"
          />
          <input
            required
            className="authorization__input"
            id="password"
            name="password"
            type="password"
            value=""
            placeholder="Пароль"
          />
          <div className="authorization__button-container">
            <button type="submit" className="authorization__button">
              Зарегистрироваться
            </button>
          </div>
        </form>
        {/* <div className="authorization__signin"> */}
        <p className="authorization__signin">
          Уже зарегистрированы?{" "}
          <Link to="/login" className="authorization__link">
            {" "}
            Войти
          </Link>
        </p>
        {/* </div> */}
      </div>
    </main>
  );
}

export default Register;