import React from "react";
import './Portfolio.css';

function Portfolio() {
    return (
        <div className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__list">
                <li className="portfolio__list-item"><a className="portfolio__link" href="#" target="_blank" rel="noreferrer">Статичный сайт</a></li>
                <li className="portfolio__list-item"><a className="portfolio__link" href="#" target="_blank" rel="noreferrer">Адаптивный сайт</a></li>
                <li className="portfolio__list-item"><a className="portfolio__link" href="#" target="_blank" rel="noreferrer">Одностраничное приложение</a></li>
            </ul>
        </div>
    );
}

export default Portfolio;