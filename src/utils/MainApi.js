class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._authorization = options.headers["authorization"];
  }
  //Метод для проверки ответа
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  //Метод для получения данных пользователя с сервера
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => this._checkResponse(res));
  }
  //Метод для отправки данных пользователя на сервер
  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then((res) => this._checkResponse(res));
  }
  //Метод для получения сохраненных фильмов пользователя с сервера
  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => this._checkResponse(res));
  }
  //Метод для сохранения фильма на сервере
  saveMovie(data) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: `https://api.nomoreparties.co${data.image.url}`,
        trailerLink: data.trailerLink,
        thumbnail: `https://api.nomoreparties.co${data.image.url}`,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      }),
    }).then((res) => this._checkResponse(res));
  }
  //Метод удаления карточки с сервера
  deleteSavedMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => this._checkResponse(res));
  }
}
//Класс для работы с Api
const mainApi = new MainApi({
  baseUrl: "https://api.movies.malinavichus.nomoreparties.co",
  headers: {
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
  },
});

export default mainApi;
