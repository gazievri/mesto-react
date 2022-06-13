const Card = (props) => {

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  return(
    <article className="element">
      <button className="element__bin" type="button" />
      <div className="element__pic" key={props.key} style={{ backgroundImage: `url(${props.card.link})` }} onClick={handleCardClick}/>
      <div className="element__title">
        <h2 className="element__title-text">{props.card.name}</h2>
        <div className="element__like-box">
          <button className="element__title-like" type="button" />
          <p className="element__title-like-num">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;
