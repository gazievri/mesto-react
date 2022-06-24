import logo from '../images/logo.svg';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import React from 'react';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';



function App() {

  const [currentUser, getUserInfo] = React.useState({});
  const [isEditAvatarPopupOpen, setStateIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setStateIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setStateIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  React.useEffect(() => {
    api.getInfo()
    .then(res => {
      getUserInfo(res);
    })
    .catch(err => console.log(err));
  }, []);

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
    setSelectedCard(null);
  }

  function handleUpdateUser(data) {
    api.sendNewProfileData(data)
    .then(res => getUserInfo(res));
    closeAllPopups();
  }

  function handleUpdateAvatar(data) {
    api.changeAvatar(data)
    .then(res => getUserInfo(res));
    closeAllPopups();
    
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
          <div className="root">
            <Header src={logo} />
            <Main
              onEditAvatar={handleClickEditAvatar}
              onAddPlace={handleClickAddPlace}
              onEditProfile={handleClickEditProfile}
              onCardClick={setSelectedCard} />
            <Footer />
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
            <PopupWithForm
            title='Новое место'
            name='new-card'
            textSubmitBtn='Сохранить'
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}>
                <input className="popup__input popup__input_field_place" placeholder="Название" type="text" name="name" id="place-input" required minLength={2} maxLength={30} />
                <span className="popup__error-text place-input-error" />
                <input className="popup__input popup__input_field_link" placeholder="Ссылка на картинку" type="url" name="link" id="link-input" required />
                <span className="popup__error-text link-input-error" />
            </PopupWithForm>
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
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
    </CurrentUserContext.Provider>
  );
}

export default App;
