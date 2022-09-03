import React, { useEffect, useState } from "react";

function FieldSet({inputType, inputClassType, placeholder, id, minLength, maxLength, value, onChange, inputRef, isOpen}) {
  const [errorMessage, setErrorMessage] = useState('');
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setIsValid(true);
  }, [isOpen]);

  function handleErrorMessage(e) {
    if (!e.target.validity.valid) {
      setIsValid(false);
      setErrorMessage(e.target.validationMessage);
    }
    else
    {
      setIsValid(true);
      setErrorMessage('');
    }

    onChange(e);
  }

  return(
    <fieldset className="form__set">
      <input 
        type={inputType}
        className={`form__input_type_${inputClassType} form__input  ${!isValid && 'form__input_type_error'}`}
        placeholder={placeholder}
        value={value}
        id={id}
        minLength={minLength}
        maxLength={maxLength}
        onChange={handleErrorMessage}
        required
        ref={inputRef}
        />
      <span className={`form__input-error ${id}-error ${!isValid && 'form__input-error_active'}`}>{errorMessage}</span>
    </fieldset>
  )
}

export default FieldSet;