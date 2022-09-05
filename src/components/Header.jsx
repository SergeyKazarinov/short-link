import React, {memo} from "react";
import { Link } from "react-router-dom";
import logo from '../images/logo.svg';

function Header({linkTitle, link, onSignOut}) {

  return (
    <header className="header">
      <div className="header__flex-container">
        <img className="header__logo" src={logo} alt="Логотип" />
        <div className="header__flex">
          <Link to={link} className="link header__link" onClick={onSignOut}>{linkTitle}</Link>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);