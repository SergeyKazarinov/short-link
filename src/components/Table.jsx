import React, {memo, useCallback} from "react";
import Select from "./Select";

const Table = ({dataLink, onChange, firstLinkIndex, onSearch}) => {
  const handleClick = useCallback((e) => {
    navigator.clipboard.writeText(`http://79.143.31.216/s/${e.target.textContent}`);
  }, [])

  const handleChange = (e) => {
    onSearch(e.target.value)
  } 
  
  const tableRow = dataLink.map((item, index) => (
                                  <ul key={item.id} className="list table__row grid">
                                    <li className="table__number">{firstLinkIndex + index + 1}</li>
                                    <li className="table__short table__copy"><a className="link" onClick={handleClick}>{item.short}</a></li>
                                    <li className="table__link"><a className="link table__link" href={item.target} target="_blank">{item.target}</a></li>
                                    <li className="table__counter">{item.counter}</li>
                                  </ul>)
          )
  return(
    <div className="table">
      <h2 className="table__title">Статистика</h2>
      <label htmlFor="search">Поиск</label>
      <input className="form__input form__input_type_search" type="text" id="search" placeholder="Поиск ссылки"onChange={handleChange}/>
      <div className="table__container" border="2">
          <ul className="list grid">
            <li className="table__number">№</li>
            <li className="table__short">Короткая ссылка</li>
            <li className="table__link">Исходная ссылка</li>
            <li className="table__counter">Переходы по ссылке</li>
          </ul>
          
          <ul className="list grid">
            <li className="table__number">Сортировка</li>
            <li className="table__short"><Select id='short' onChange={onChange}/></li>
            <li className="table__link"><Select id='target' onChange={onChange}/></li>
            <li className="table__counter"><Select id='counter' onChange={onChange}/></li>
          </ul>
          {tableRow}
      </div>
    </div>
  )
}

export default memo(Table);