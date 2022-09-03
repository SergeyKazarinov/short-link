import React from "react";
import { Link } from "react-router-dom";
import logo from '../images/logo.svg';

function Header({linkTitle, link, onSignOut, loggedIn}) {

  return (
    <header className="header">
      <div className="header__flex-container">
        <img className="header__logo" src={logo} alt="Логотип" />
        <div className={`header__flex ${loggedIn && "header__flex_type_loggedIn"}`}>
          <Link to={link} className="link header__link" onClick={onSignOut}>{linkTitle}</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;