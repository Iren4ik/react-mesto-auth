import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";
import { api } from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRouteElement from "./ProtectedRoute";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setRegisterPopupOpen] = React.useState(false);
  const [isPreloading, setPreloading] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cardToDelete, setCardToDelete] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    Promise.all([api.getProfileInfo(), api.getInitialCards()])
      .then(([dataUser, dataCards]) => {
        setCurrentUser(dataUser);
        setCards(dataCards);
      })
      .catch((error) => console.log(`Что-то пошло не так: ${error}`));
  }, []);

  // Открытие попапа ававтара
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  // Открытие попапа реадиктирования попапа
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  // Открытие попапа добавления карточки
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  // Открытие попапа удаления карточки
  function handleDeleteCardClick(card) {
    setDeleteCardPopupOpen(true);
    setCardToDelete(card);
  }

  // Открытие выбранной карточки
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // Закрытие попапов
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setDeleteCardPopupOpen(false);
    setRegisterPopupOpen(false);
    setSelectedCard(null);
    setCardToDelete({});
  }

  //универсальная функция, принимающая функцию запроса
  function handleSubmit(request) {
    // изменяем текст кнопки до вызова запроса
    setPreloading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      // возвращаем обратно начальный текст кнопки
      .finally(() => setPreloading(false));
  }

  // Поставить лайк
  function handleCardLike(card) {
    function makeRequest() {
      const isLiked = card.likes.some((i) => i._id === currentUser._id);
      // return позволяет дальше продолжать цепочку then, catch, finally
      return api.changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        });
    }
    handleSubmit(makeRequest);
  }

  // Удалить карточку
  function handleCardDelete(card) {
    function makeRequest() {
      return api.deleteCard(card._id)
        .then(() => {
          setCards((state) => state.filter((c) => c._id !== card._id));
        });
    }
    handleSubmit(makeRequest);
  }

  //Обновить данные профиля
  function handleUpdateUser(inputValues) {
    function makeRequest() {
      return api.setUserInfo(inputValues)
        .then((dataUser) => {
          setCurrentUser(dataUser);
        });
    }
    handleSubmit(makeRequest);
  }

  // Обновить аватар
  function handleUpdateAvatar(inputValue) {
    function makeRequest() {
      return api.setUserAvatar(inputValue)
        .then((dataUser) => {
          setCurrentUser(dataUser);
        });
    }
    handleSubmit(makeRequest);
  }

  // Добавить карточку
  function handleAddPlaceSubmit(inputValue) {
    function makeRequest() {
      return api.postNewCard(inputValue)
        .then((newCard) => {
          setCards([newCard, ...cards]);
        });
    }
    handleSubmit(makeRequest);
  }

  //«Внедряем» данные из currentUser с помощью провайдера
  //пропс value содержит значение, которое распространаяется дочерним элементам
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />

        <Routes>
          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-in" element={<Login />} />
          {/* <Route path='/' 
              element={loggedIn ? (<Navigate to='/' replace/>) : (<Navigate to='/sign-in'replace/>)
            } 
          /> */}
          <Route
            path="*"
            element={<ProtectedRouteElement 
              loggedIn={loggedIn} 
                element={<Main
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onTrashClick={handleDeleteCardClick}
                cards={cards}
              />} 
            />}
          />
        </Routes>

        <Footer />

        <InfoTooltip
          isOpen={isRegisterPopupOpen}
          onClose={closeAllPopups}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isPreloading={isPreloading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isPreloading={isPreloading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isPreloading={isPreloading}
        />
        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          isPreloading={isPreloading}
          card={cardToDelete}
          onCardDelete={handleCardDelete}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;