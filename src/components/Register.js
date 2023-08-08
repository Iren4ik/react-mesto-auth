import React from "react";
import { Link } from "react-router-dom";
import "./styles/Authorization.css";


function Register({ onRegister }) {
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formValue.email, formValue.password)
  }
  
  return (
    <main className="content">
      <div className="authorization">
        <p className="authorization__welcome">Регистрация</p>
        <form className="authorization__form" onSubmit={handleSubmit}>
          <input
            required
            className="authorization__input"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formValue.email}
            onChange={handleChange}
          />
          <input
            required
            className="authorization__input"
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            minLength="8"
            value={formValue.password}
            onChange={handleChange}
          />
          <div className="authorization__button-container">
            <button type="submit" className="authorization__button">
              Зарегистрироваться
            </button>
          </div>
        </form>
        <p className="authorization__signin">
          Уже зарегистрированы?{" "}
          <Link to="/sign-in" className="authorization__link">{" "}Войти</Link>
        </p>
      </div>
    </main>
  );
}

export default Register;