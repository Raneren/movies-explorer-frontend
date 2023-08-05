import React from "react";
import './MoviesCard.css';
import moviePreview from "../../../images/movie-test-1.png"

function MoviesCard() {
    return (
        <div className="movies-card">
            <img src={moviePreview} alt=""></img>
            <div className="movies-card__info">
                <p className="movies-card__name">33 слова о дизайне</p>
                <p className="movies-card__duration">1ч 17м</p>
            </div>
        </div>
    );
}

export default MoviesCard;