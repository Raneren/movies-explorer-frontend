import React from "react";
import { useLocation } from "react-router-dom";
import './MoviesCard.css';
import moviePreview from "../../../images/movie-test-1.png"

function MoviesCard() {
    const location = useLocation();
    return (
        <div className="movies-card">
            <img className="movies-card__photo" src={moviePreview} alt=""></img>
            {(location.pathname === "/movies") && <button className="movies-card__button movies-card__button_save" type="button">Сохранить</button>}
            {(location.pathname === "/saved-movies") && <button className="movies-card__button movies-card__button_delete" type="button"></button>}
            <div className="movies-card__info">
                <p className="movies-card__name">33 слова о дизайне</p>
                <p className="movies-card__duration">1ч 17м</p>
            </div>
        </div>
    );
}

export default MoviesCard;