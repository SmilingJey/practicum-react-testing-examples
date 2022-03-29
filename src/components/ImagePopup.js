import React from "react";
import PropTypes from 'prop-types';
import Popup from "./Popup.js";

function ImagePopup({ card, onClose }) {
  const isOpen = !!card;

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      popupClass='popup_type_image'
      contentClass='popup__content_content_image'
    >
      <img
        alt={card ? card.name : ""}
        src={card ? card.link : ""}
        className='popup__image'
      />
      <p className='popup__caption'>{card ? card.name : ""}</p>
    </Popup>
  );
}

export default ImagePopup;
