import React from "react";

const Pagination = ({linksPerPage, totalLinks, paginate}) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalLinks / linksPerPage); i++) {
    pageNumber.push(i);
  }

  return(
    <div className="pagination">
      <ul className="list pagination__list">
        {
          pageNumber.map(number => (
            <li className="pagination__item" key={number}>
              <a className="pagination__link link" href="#" onClick={() => paginate(number)}>{number}</a>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Pagination;