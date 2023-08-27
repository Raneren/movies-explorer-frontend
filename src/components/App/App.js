import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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
import mainApi from "../../utils/MainApi";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [isEditFormActive, setIsEditFormActive] = React.useState(false);
  const [foundMovies, setFoundMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [foundMoviesInSaved, setFoundMoviesInSaved] = React.useState([]);
  const [isPreloaderActive, setIsPreloaderActive] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);
  const [isCheckedInSaved, setIsCheckedInSaved] = React.useState(false);

  const navigate = useNavigate();
  React.useEffect(() => {
    setFoundMoviesInSaved(savedMovies);
  }, [savedMovies]);
  React.useEffect(() => {
    if (localStorage.foundMovies) {
      setFoundMovies(JSON.parse(localStorage.foundMovies));
    }
    if (localStorage.isChecked) {
      setIsChecked(JSON.parse(localStorage.isChecked));
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
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  }
  React.useEffect(() => {
    handleCheckToken();
  }, [loggedIn]);
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
  //функция регистрации пользователя
  function handleRegister(name, email, password) {
    auth
      .register(name, email, password)
      .then(() => {
        navigate("/sign-in");
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
        navigate("/");
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
    mainApi
      .deleteSavedMovie(movie._id)
      .then(() => {
        setSavedMovies((movies) =>
          movies.filter((currentMovie) => currentMovie._id !== movie._id)
        );
      })
      .catch((err) => console.log(err));
  }
  //функция переключения чекбокса
  function handleChangeFilterCheckbox() {
    setIsChecked(!isChecked);
  }
  //функция переключения чекбокса в сохраненных фильмах
  function handleChangeFilterCheckboxInSaved() {
    setIsCheckedInSaved(!isCheckedInSaved);
  }
  //функция поиска фильмов среди сохраненных
  function handleSearchInSavedMovies(movie) {
    const foundMovies = savedMovies.filter((item) =>
      isCheckedInSaved
        ? (item.nameRU.toLowerCase().includes(movie.toLowerCase()) ||
            item.nameEN.toLowerCase().includes(movie.toLowerCase())) &
          (item.duration <= 40)
        : item.nameRU.toLowerCase().includes(movie.toLowerCase()) ||
          item.nameEN.toLowerCase().includes(movie.toLowerCase())
    );
    setFoundMoviesInSaved(foundMovies);
  }
  //функция поиска фильмов
  function handleSearch(movie) {
    setIsPreloaderActive(true);
    moviesApi
      .getAllMovies()
      .then((movies) => {
        movies.map((item) => {
          return item;
        });
        const foundMovies = movies.filter((item) =>
          isChecked
            ? (item.nameRU.toLowerCase().includes(movie.toLowerCase()) ||
                item.nameEN.toLowerCase().includes(movie.toLowerCase())) &
              (item.duration <= 40)
            : item.nameRU.toLowerCase().includes(movie.toLowerCase()) ||
              item.nameEN.toLowerCase().includes(movie.toLowerCase())
        );
        return foundMovies;
      })
      .then((foundMovies) => {
        setFoundMovies(foundMovies);
        localStorage.setItem("foundMovies", JSON.stringify(foundMovies));
        localStorage.setItem("searchQuery", movie);
        localStorage.setItem("isChecked", JSON.stringify(isChecked));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => setIsPreloaderActive(false));
  }
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
                  preloaderActive={isPreloaderActive}
                  onSearch={handleSearch}
                  isChecked={isChecked}
                  onChange={handleChangeFilterCheckbox}
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
                  isChecked={isCheckedInSaved}
                  onChange={handleChangeFilterCheckboxInSaved}
                  onDelete={handleDeleteMovie}
                  savedMovies={savedMovies}
                  foundMovies={foundMoviesInSaved}
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
