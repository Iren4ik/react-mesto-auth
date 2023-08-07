import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/Authorization.css";
import { register } from "../utils/auth.js"

function Register() {

  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  //получаем объект события `e`, который содержит информацию о текущем элементе формы, 
  //который был изменен. Затем он извлекает свойства `name` и `value` 
  //из объекта события и использует их для обновления значения в объекте `formValue`.
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValue;
    register(email, password)
      .then((res) => {
        navigate('/sign-in', {replace: true});
      });
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
            type="text"
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
            value={formValue.password}
            onChange={handleChange}
          />
          <div className="authorization__button-container">
            <button type="submit" className="authorization__button" onSubmit={handleSubmit}>
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