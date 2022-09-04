import React from "react";
import Select from "./Select";

const Table = ({dataLink, onChange, firstLinkIndex}) => {
  const tableRow = dataLink.map((item, index) => (
                                  <ul key={item.id} className="list table__row grid">
                                    <li className="table__number">{firstLinkIndex + index + 1}</li>
                                    <li className="table__short"><a className="link" href={`http://79.143.31.216/s/${item.short}`} target="_blanck">{item.short}</a></li>
                                    <li className="table__link"><a className="link table__link" href={item.target}>{item.target}</a></li>
                                    <li className="table__counter">{item.counter}</li>
                                  </ul>)
          )
    console.log(tableRow)
  return(
    <div className="table">
      <h2 className="table__title">Статистика</h2>
      <div className="table__container" border="2">
          <ul className="list grid">
            <li className="table__number">№</li>
            <li className="table__short">Короткая ссылка</li>
            <li className="table__link">Исходная ссылка</li>
            <li className="table__counter">Переходы по ссылке</li>
          </ul>
          
          <ul className="list grid">
            <li className="table__number">Сортировка</li>
            <li className="table__short"><Select /></li>
            <li className="table__link"><Select /></li>
            <li className="table__counter"><Select onChange={onChange}/></li>
          </ul>
          {tableRow}
      </div>
    </div>
  )
}

export default Table;