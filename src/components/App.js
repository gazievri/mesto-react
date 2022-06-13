import logo from '../images/logo.svg';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import React from 'react';

function App() {

  const [isEditAvatarPopupOpen, setStateIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setStateIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setStateIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  function handleClickEditAvatar() {
    setStateIsEditAvatarPopupOpen(true)
  }

  function handleClickEditProfile() {
    setStateIsEditProfilePopupOpen(true)
  }

  function handleClickAddPlace() {
    setStateIsAddPlacePopupOpen(true)
  }

  function closeAllPopups() {
    setStateIsEditAvatarPopupOpen(false);
    setStateIsEditProfilePopupOpen(false);
    setStateIsAddPlacePopupOpen(false);
    setSelectedCard(false);
  }

  return (
    <div className="App">

      <div className='body'>
        <div className="root">
          <Header src={logo} />
          <Main
            onEditAvatar={handleClickEditAvatar}
            onAddPlace={handleClickAddPlace}
            onEditProfile={handleClickEditProfile}
            onCardClick={setSelectedCard}/>
          <Footer />

          <PopupWithForm
          title='Редактировать профиль'
          name='profile-edit'
          children={
            <div>
              <input className="popup__input popup__input_field_name" placeholder="Ваши имя и фамилия" type="text" name="name" id="name-input" required minLength={2} maxLength={40} />
              <span className="popup__error-text name-input-error" />
              <input className="popup__input popup__input_field_occupation" placeholder="Ваша работа" type="text" name="about" id="about-input" required minLength={2} maxLength={200} />
              <span className="popup__error-text about-input-error" />
            </div>
          }
          textSubmitBtn='Сохранить'
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups} />

          <PopupWithForm
          title='Новое место'
          name='new-card'
          children={
            <div>
              <input className="popup__input popup__input_field_place" placeholder="Название" type="text" name="name" id="place-input" required minLength={2} maxLength={30} />
              <span className="popup__error-text place-input-error" />
              <input className="popup__input popup__input_field_link" placeholder="Ссылка на картинку" type="url" name="link" id="link-input" required />
              <span className="popup__error-text link-input-error" />
            </div>
          }
          textSubmitBtn='Сохранить'
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups} />

          <PopupWithForm
          title='Обновить аватар'
          name='avatar-edit'
          children={
            <div>
              <input className="popup__input popup__input_field_link" placeholder="Ссылка на картинку" type="url" name="avatar" id="avatarlink-input" required />
              <span className="popup__error-text avatarlink-input-error" />
            </div>
          }
          textSubmitBtn='Сохранить'
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups} />

          <PopupWithForm
          title='Вы уверены?'
          name='delete-confirm'
          textSubmitBtn='Да'
          onClose={closeAllPopups} />

          <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups} />

        </div>

      </div>

    </div>

  );
}

export default App;
