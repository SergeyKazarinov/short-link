import React, {useCallback} from "react";

function Popup({name, nameContainer, isOpen, onClose, link}) {
  function handleCLoseOverlayClick(e) {
    if(e.target === e.currentTarget) {
      closePopup();
    }
  }

  if(isOpen) {
    window.addEventListener('keydown', handleEscClose);
  }
  
  function handleEscClose(e) {
    e.key === "Escape" && closePopup();
  }

  function closePopup() {
    window.removeEventListener('keydown', handleEscClose);
    onClose();
  }

  const handleClick = useCallback((e) => {
    navigator.clipboard.writeText(`http://79.143.31.216/s/${e.target.textContent}`);
  }, [])

  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      onMouseDown={handleCLoseOverlayClick}
    >
      <div className={nameContainer}>
        <button
          onClick={closePopup}
          type="button"
          className="button button_type_close"
          aria-label="Закрыть окно"
        />
        <h2 className="popup__title-info">Ссылка создана</h2>
        <p className="popup__text">Ваша ссылка: {link.target}</p>
        <p className="popup__text">Короткая ссылка: <a className="link popup__text link__copy" onClick={handleClick}>{link.short}</a></p>
      </div>
    </div>
  );
}

export default Popup;