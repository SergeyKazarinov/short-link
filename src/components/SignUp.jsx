import React, { useRef, memo, useCallback } from "react";
import { Link } from "react-router-dom";
import useFormValidation from "../hooks/useFormValidation";
import FieldSet from "./Fieldset";


const SignUp = ({title, titleBtn, isLogin, onSubmit }) => {
  const userName = useRef();
  const userPassword = useRef();
  const {isButtonValid, handleTheFirstInputChange, handleTheSecondInputChange} = useFormValidation(userName, userPassword);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    onSubmit({
      username: userName.current.value,
      password: userPassword.current.value
    })
  }, [])

  return(
    <div className="sign-up__container">
      <h2 className="form__title">{title}</h2>
      <form className="form form_type_page" name="sing-in" onSubmit={handleSubmit}>
        <FieldSet 
          inputType="text"
          inputClassType="registration"
          placeholder="Имя"
          id="input-name"
          minLength="2"
          maxLength="40"
          inputRef={userName}
          onChange={handleTheFirstInputChange}
        />

        <FieldSet 
          inputType="password"
          inputClassType="registration"
          placeholder="Пароль"
          id="input-password"
          minLength="6"
          maxLength="50"
          inputRef={userPassword}
          onChange={handleTheSecondInputChange}
        />
        <button
          className={`button button_type_authorization ${!isButtonValid && "button_inactive"} ${isLogin && "button_type_login"}`}
          value={titleBtn}
          id="button-save"
          disabled={!isButtonValid}
        >
          {titleBtn}
        </button>
        {!isLogin && <p className="sign-up__description">Уже зарегистрированы? <Link to="/sign-in" className="link">Войти</Link></p>}
      </form>
    </div>
  )
}

export default memo(SignUp);