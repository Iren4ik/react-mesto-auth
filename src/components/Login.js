import React from "react";
import "./styles/Authorization.css";

function Login() {
  return (
    <main className="content">
      <div className="authorization">
        <p className="authorization__welcome">Вход</p>
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
              Войти
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;