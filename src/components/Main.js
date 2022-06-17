import React from 'react';
import { api } from '../utils/Api.js';
import Card from './Card';


const Main = (props) => {

  const [userName, setUserName] = React.useState(null);
  const [userDescription, setUserDescription] = React.useState(null);
  const [userAvatar, setUserAvatar] = React.useState(null);
  const [cards, setDataCards] = React.useState([]);

  React.useEffect(() => {
    api.getInfo()
    .then(res => {
      setUserName(res.name);
      setUserDescription(res.about);
      setUserAvatar(res.avatar)
    })
    .catch(err => console.log(err));
  }, []);

  React.useEffect(() => {
    api.getCards()
    .then(resolve => setDataCards(resolve))
    .catch(err => console.log(err));
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }} />
        <button className="profile__avatar-edit" type="button" onClick={props.onEditAvatar} />
        <div className="profile__profile-info">
          <div className="profile__title-and-button">
            <h1 className="profile__title">{userName}</h1>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
          <button className="profile__edit-button" type="button" aria-label="Редактировать профиль" onClick={props.onEditProfile} />
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace} />
      </section>
      <section className="elements">
        {cards.map(item => {
          return(
            <Card key={item._id} card={item} onCardClick={props.onCardClick} />
          )
        })}
      </section>
    </main>
  );
}

export default Main;

