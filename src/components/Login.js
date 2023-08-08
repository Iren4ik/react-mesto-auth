import React from "react";
import { useFormWithValidation } from "../hooks/useFormWithValidation";

function Login({onLogin}) {

  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();

  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    onLogin(values.email, values.password)
  }

  return (
    <main className="content">
      <div className="authorization">
        <p className="authorization__welcome">Вход</p>
        <form className="authorization__form form" onSubmit={handleSubmit} noValidate>
          <input
            className={
              errors.email ? "authorization__input authorization__input_valid_error" : "authorization__input"
            }
            required
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={values.email || ""}
            onChange={handleChange}
          />
          <span className="authorization__error authorization__error_visible">{errors.email}</span>
          <input
            className={
              errors.password ? "authorization__input authorization__input_valid_error" : "authorization__input"
            }
            required
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            minLength="8"
            value={values.password || ""}
            onChange={handleChange}
          />
          <span className="authorization__error authorization__error_visible">{errors.password}</span>
          <div className="authorization__button-container">
            <button 
              type="submit" 
              className={
                isValid ? "authorization__button" : "authorization__button authorization__button_disabled"
              }
              disabled={!isValid}
            >
              Войти
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;