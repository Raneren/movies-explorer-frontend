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
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [isEditFormActive, setIsEditFormActive] = React.useState(false);
  const [foundMovies, setFoundMovies] = React.useState([]);
  const [isPreloaderActive, setIsPreloaderActive] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);

  const navigate = useNavigate();

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
        .then((res) => {
          setLoggedIn(true);
          navigate("/");
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
  //функция активации редактирования профиля
  function handleEditButtonClick() {
    isEditFormActive ? setIsEditFormActive(false) : setIsEditFormActive(true);
  }
  //функция переключения чекбокса
  function handleChangeFilterCheckbox() {
    setIsChecked(!isChecked);
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
            ? item.nameRU.toLowerCase().includes(movie.toLowerCase()) &
              (item.duration <= 40)
            : item.nameRU.toLowerCase().includes(movie.toLowerCase())
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
                  preloaderActive={isPreloaderActive}
                  onSearch={handleSearch}
                  isChecked={isChecked}
                  onChange={handleChangeFilterCheckbox}
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
                <ProtectedRoute loggedIn={loggedIn} element={SavedMovies} />
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
                  onEditButtonClick={handleEditButtonClick}
                  onSignOut={handleSignOut}
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
