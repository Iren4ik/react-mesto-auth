import React from "react";
import "./styles/Authorization.css";
import { useNavigate } from "react-router-dom";
import {authorize} from "../utils/auth.js"

function Login({handleLogin}) {

  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    authorize(formValue.email, formValue.password)
      .then ((data) => {
        if (data.token) {
          setFormValue({email: '', password: ''});
          handleLogin();
          navigate('/', {replace: true})
        }
      })
  }


  return (
    <main className="content">
      <div className="authorization">
        <p className="authorization__welcome">Вход</p>
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
              Войти
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;