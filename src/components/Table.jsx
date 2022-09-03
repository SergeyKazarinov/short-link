import React from "react";

const Table = ({dataLink}) => {
  const tableRow = dataLink.map(item => (
                                  <ul key={item.id} className="list table__row grid">
                                    <li className="table__short">{item.short}</li>
                                    <li className="table__link"><a className="link table__link" href={item.target}>{item.target}</a></li>
                                    <li className="table__counter">{item.counter}</li>
                                  </ul>)
                                )

  return(
    <div className="table">
      <h2 className="table__title">Статистика</h2>
      <div className="table__container" border="2">
          <ul className="list grid">
            <li className="table__short">Короткая ссылка</li>
            <li className="table__link">Исходная ссылка</li>
            <li className="table__counter">Переходы по ссылке</li>
          </ul>
          {tableRow}
      </div>
    </div>
  )
}

export default Table;