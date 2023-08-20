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

function App() {
  const [isEditFormActive, setIsEditFormActive] = React.useState(false);

  //функция активации редактирования профиля
  function handleEditButtonClick() {
    isEditFormActive ? setIsEditFormActive(false) : setIsEditFormActive(true);
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
              <Movies />
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

