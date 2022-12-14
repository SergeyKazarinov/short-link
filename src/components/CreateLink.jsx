import React, {useRef, memo, useCallback} from "react";
import FieldSet from "./Fieldset";
import useFormValidation from "../hooks/useFormValidation";

const CreateLink = ({onSubmit}) => {
const link = useRef();
const {isTheFirstValid, handleTheFirstInputChange} = useFormValidation(link);

const handleSubmit = useCallback((e) => {
  e.preventDefault();
  onSubmit({
    link: link.current.value,
  })
  link.current.value = '';
}, [])

  return(
    <div className="createLink">
      <form className="form form_type_link" name="createLink" onSubmit={handleSubmit}>
        <FieldSet 
          inputType="url"
          inputClassType="registration"
          placeholder="Ссылка"
          id="input-link"
          inputRef={link}
          onChange={handleTheFirstInputChange}
        />
        <button
          className={`button button_type_save  ${!isTheFirstValid && "button_inactive"}`}
          value="Создать ссылку"
          id="button-save"
          disabled={!isTheFirstValid}
        >
          Создать ссылку
        </button>
      </form>
    </div>
  )
}

export default memo(CreateLink);