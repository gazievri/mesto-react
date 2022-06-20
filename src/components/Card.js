import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


const Card = ({ card, onCardClick, onCardLike }) => {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
  );
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `...`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  return(
    <article className="element">
      <button className="element__bin" type="button"/>
      <div className="element__pic" key={card._id} style={{ backgroundImage: `url(${card.link})` }} onClick={handleCardClick}/>
      <div className="element__title">
        <h2 className="element__title-text">{card.name}</h2>
        <div className="element__like-box">
          <button className="element__title-like" type="button" onClick={handleCardLike}/>
          <p className="element__title-like-num">{card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;
