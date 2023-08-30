import React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import SavedMovies from "../SavedMovies/SavedMovies";
import PageNotFound from "../PageNotFound/PageNotFound";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as auth from "../../utils/auth";
import moviesApi from "../../utils/MoviesApi";
import MainApi from "../../utils/MainApi";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [isEditFormActive, setIsEditFormActive] = React.useState(false);
  const [foundMovies, setFoundMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [foundMoviesInSaved, setFoundMoviesInSaved] = React.useState([]);
  const [isPreloaderActive, setIsPreloaderActive] = React.useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  //Класс для работы с Api
  const mainApi = new MainApi({
    baseUrl: "https://api.movies.malinavichus.nomoreparties.co",
    headers: {
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  React.useEffect(() => {
    if (localStorage.foundMovies) {
      setFoundMovies(JSON.parse(localStorage.foundMovies));
    }
  }, []);
  //функция проверки токена
  function handleCheckToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then(() => {
          setLoggedIn(true);
          navigate("/movies");
        })
        .catch((err) => console.log(err));
    }
  }
  React.useEffect(() => {
    handleCheckToken();
  }, [loggedIn]);
  //функция регистрации пользователя
  function handleRegister(name, email, password) {
    auth
      .register(name, email, password)
      .then(() => {
        handleLogin(email, password);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //функция авторизации пользователя
  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        navigate("/movies");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //функция выхода из профиля
  function handleSignOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("foundMovies");
    localStorage.removeItem("searchQuery");
    localStorage.removeItem("isChecked");
    setLoggedIn(false);
  }
  //функция редактирования профиля
  function handleUpdateUserInfo(value) {
    mainApi
      .setUserInfo(value)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));
  }
  //функция переключения кнопки и активации редактирования профиля
  function handleToggleEditButton() {
    isEditFormActive ? setIsEditFormActive(false) : setIsEditFormActive(true);
  }
  //функция сохранения карточки фильма
  function handleSaveMovie(movie) {
    mainApi
      .saveMovie(movie)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => console.log(err));
  }
  //функция удаления карточки фильма
  function handleDeleteMovie(movie) {
    if (!movie._id) {
      const savedMovie = savedMovies.find(
        (savedMovie) => savedMovie.movieId === movie.id
      );
      movie._id = savedMovie._id;
    }
    mainApi
      .deleteSavedMovie(movie._id)
      .then(() => {
        setSavedMovies((movies) =>
          movies.filter((currentMovie) => currentMovie._id !== movie._id)
        );
        setFoundMoviesInSaved((movies) =>
          movies.filter((currentMovie) => currentMovie._id !== movie._id)
        );
      })
      .catch((err) => console.log(err));
  }

  //функция поиска фильмов среди сохраненных
  function handleSearchInSavedMovies(movie) {
    setIsPreloaderActive(true);
    const foundMovies = savedMovies.filter(
      (item) =>
        item.nameRU.toLowerCase().includes(movie.toLowerCase()) ||
        item.nameEN.toLowerCase().includes(movie.toLowerCase())
    );
    setFoundMoviesInSaved(foundMovies);
  }
  //функция поиска фильмов
  function handleSearch(movie, checked) {
    setIsPreloaderActive(true);
    moviesApi
      .getAllMovies()
      .then((movies) => {
        movies.map((item) => {
          return item;
        });
        const foundMovies = movies.filter(
          (item) =>
            item.nameRU.toLowerCase().includes(movie.toLowerCase()) ||
            item.nameEN.toLowerCase().includes(movie.toLowerCase())
        );
        return foundMovies;
      })
      .then((foundMovies) => {
        setFoundMovies(foundMovies);
        localStorage.setItem("foundMovies", JSON.stringify(foundMovies));
        localStorage.setItem("searchQuery", movie);
        localStorage.setItem("isChecked", JSON.stringify(checked));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => setIsPreloaderActive(false));
  }
  //функция фильтра короткометражек
  function handleCheckboxFilter(checked) {
    let shortMovies;
    let movies =
      location.pathname === "/movies"
        ? JSON.parse(localStorage.foundMovies)
        : savedMovies;
    if (checked) {
      shortMovies = movies.filter((item) => item.duration <= 40);
    } else if (!checked) {
      shortMovies = movies;
    }
    location.pathname === "/movies"
      ? setFoundMovies(shortMovies)
      : setFoundMoviesInSaved(shortMovies);
    location.pathname === "/movies" &&
      localStorage.setItem("isChecked", JSON.stringify(checked));
  }
  //Получаем данные профиля и сохраненные фильмы с сервера для авторизованного пользователя
  React.useEffect(() => {
    if (loggedIn) {
      mainApi
        .getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => console.log(err));
      mainApi
        .getSavedMovies()
        .then((moviesData) => {
          setSavedMovies(moviesData);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header loggedIn={loggedIn} />
                <Main />
                <Footer />
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <>
                <Header loggedIn={loggedIn} />
                <ProtectedRoute
                  loggedIn={loggedIn}
                  element={Movies}
                  movies={foundMovies}
                  onSave={handleSaveMovie}
                  onDelete={handleDeleteMovie}
                  preloaderActive={isPreloaderActive}
                  onSearch={handleSearch}
                  onCheckboxFilter={handleCheckboxFilter}
                  savedMovies={savedMovies}
                  foundMovies={foundMovies}
                />
                <Footer />
              </>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <>
                <Header loggedIn={loggedIn} />
                <ProtectedRoute
                  loggedIn={loggedIn}
                  element={SavedMovies}
                  movies={savedMovies}
                  onSearch={handleSearchInSavedMovies}
                  onCheckboxFilter={handleCheckboxFilter}
                  onDelete={handleDeleteMovie}
                  savedMovies={savedMovies}
                  foundMovies={foundMoviesInSaved}
                  setFoundMoviesInSaved={setFoundMoviesInSaved}
                />
                <Footer />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Header loggedIn={loggedIn} />
                <ProtectedRoute
                  loggedIn={loggedIn}
                  element={Profile}
                  isActive={isEditFormActive}
                  onEditToggle={handleToggleEditButton}
                  onSignOut={handleSignOut}
                  onUpdateUserInfo={handleUpdateUserInfo}
                />
              </>
            }
          />
          <Route
            path="/sign-in"
            element={
              <>
                <Header loggedIn={loggedIn} />
                <Login onLogin={handleLogin} />
              </>
            }
          />
          <Route
            path="/sign-up"
            element={
              <>
                <Header loggedIn={loggedIn} />
                <Register onRegister={handleRegister} />
              </>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
