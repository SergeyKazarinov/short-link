import React, {memo} from "react";

const Select = ({onChange}) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  }
  
  return(
    <select className="select" name="select" onChange={handleChange}>
      <option className="select__option" id="default" value="default">По умолчанию</option>
      <option className="select__option" id="short" value="shortRise">По возрастанию короткой ссылки</option>
      <option className="select__option" id="short" value="shortDown">По убыванию короткой ссылки</option>
      <option className="select__option" id="target" value="targetRise">По возрастанию исходной ссылки</option>
      <option className="select__option" id="target" value="targetDown">По убыванию исходной ссылки</option>
      <option className="select__option" id="counter" value="counterRise">По возрастанию переходов по ссылке</option>
      <option className="select__option" id="counter" value="counterDown">По убыванию переходов по ссылке</option>
  </select>
  )
}

export default memo(Select);