class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  //Проверка
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ой! Ошибка: ${res.status}`);
  }

  //Универсальный метода запроса
  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  //Загрузка информации о пользователе с сервера
  getProfileInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  //Загрузка карточек с сервера
  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}` 
      }
    })
  }

  //Редактирование профиля
  setUserInfo(dataUser) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        name: dataUser.name,
        about: dataUser.about,
      })
    })
  }

  //Обновление аватара пользователя
  setUserAvatar(dataUser) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        avatar: dataUser.avatar,
      })
    })
  }

  //Добавление новой карточки
  postNewCard(dataCard) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        name: dataCard.name,
        link: dataCard.link,
      })
    })
  }

  //добавление и удаление лайков
  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
      })
    } else {
      return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
      })
    }
  }

  //Удаление карточки
  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}` 
      }
    })
  }
}

//https://mesto.nomoreparties.co/v1/cohort-69
export const api = new Api({
  baseUrl: 'http://localhost:3000',
});