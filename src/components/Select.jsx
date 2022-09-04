import React from "react";

const Select = ({id, onChange}) => {
  const handleChange = (e) => {
    onChange(e.target.value, id);
  }
  
  return(
    <select className="select" name="select" onChange={handleChange}>
      <option className="select__option" value="default" selected>По умолчанию</option>
      <option className="select__option" value="rise">По возрастанию</option>
      <option className="select__option" value="down">По убыванию</option>
  </select>
  )
}

export default Select;