import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import SavedMovies from "../SavedMovies/SavedMovies";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./App.css";
import moviesApi from "../../utils/MoviesApi";

function App() {
  const [isEditFormActive, setIsEditFormActive] = React.useState(false);
  const [foundMovies, setFoundMovies] = React.useState([]);
  const [isPreloaderActive, setIsPreloaderActive] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);
  //функция активации редактирования профиля
  function handleEditButtonClick() {
    isEditFormActive ? setIsEditFormActive(false) : setIsEditFormActive(true);
  }
  function handleChangeFilterCheckbox() {
    setIsChecked(!isChecked);
  }
  function handleSearch(movie) {
    setIsPreloaderActive(true);
    moviesApi
      .getAllMovies()
      .then((movies) => {
        movies.map((item) => {
          return item;
        });
        setFoundMovies(
          movies.filter((item) =>
            isChecked
              ? item.nameRU.toLowerCase().includes(movie.toLowerCase()) &
                (item.duration <= 40)
              : item.nameRU.toLowerCase().includes(movie.toLowerCase())
          )
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => setIsPreloaderActive(false));
  }
  return (
    <div className="page">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Main />
              <Footer />
            </>
          }
        />
        <Route
          path="/movies"
          element={
            <>
              <Header />
              <Movies
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
              <Header />
              <SavedMovies />
              <Footer />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Header />
              <Profile
                isActive={isEditFormActive}
                onEditButtonClick={handleEditButtonClick}
              />
            </>
          }
        />
        <Route
          path="/sign-in"
          element={
            <>
              <Header />
              <Login />
            </>
          }
        />
        <Route
          path="/sign-up"
          element={
            <>
              <Header />
              <Register />
            </>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
