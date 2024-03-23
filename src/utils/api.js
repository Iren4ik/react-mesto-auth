class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
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
      headers: { authorization: this._authorization }
    })
  }

  //Загрузка карточек с сервера
  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: { authorization: this._authorization }
    })
  }

  //Редактирование профиля
  setUserInfo(dataUser) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
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
      headers: this._headers,
      body: JSON.stringify({
        avatar: dataUser.avatar,
      })
    })
  }

  //Добавление новой карточки
  postNewCard(dataCard) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
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
        headers: { authorization: this._authorization }
      })
    } else {
      return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: { authorization: this._authorization }
      })
    }
  }

  //Удаление карточки
  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: { authorization: this._authorization }
    })
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
  headers: {
    authorization: '9675f261-5028-4072-91c8-021126ec9131',
    'Content-Type': 'application/json'
  }
});