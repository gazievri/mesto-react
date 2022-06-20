import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { api } from '../utils/Api.js';
import Card from './Card';


const Main = (props) => {
  const currentUser = React.useContext(CurrentUserContext);
  const [cards, setDataCards] = React.useState([]);

  React.useEffect(() => {
    api.getCards()
    .then(resolve => setDataCards(resolve))
    .catch(err => console.log(err));
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setDataCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
  }

  return (
      <main>
        <section className="profile">
          <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }} />
          <button className="profile__avatar-edit" type="button" onClick={props.onEditAvatar} />
          <div className="profile__profile-info">
            <div className="profile__title-and-button">
              <h1 className="profile__title">{currentUser.name}</h1>
              <p className="profile__subtitle">{currentUser.about}</p>
            </div>
            <button className="profile__edit-button" type="button" aria-label="Редактировать профиль" onClick={props.onEditProfile} />
          </div>
          <button className="profile__add-button" type="button" onClick={props.onAddPlace} />
        </section>
        <section className="elements">
          {cards.map(item => {
            return(
              <Card key={item._id} card={item} onCardClick={props.onCardClick} onCardLike={handleCardLike} />
            )
          })}
        </section>
      </main>
  );
}

export default Main;

