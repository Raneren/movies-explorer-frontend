import React from "react";
import './AboutProject.css';

function AboutProject() {
    return (
        <div className="about-poject" id="about-poject">
            <h2 className="about-poject__title">О проекте</h2>
            <div className="about-poject__text-container">
                <div className="about-poject__column">
                    <h3 className="about-poject__column-title">Дипломный проект включал 5 этапов</h3>
                    <p className="about-poject__paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about-poject__column">
                    <h3 className="about-poject__column-title">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-poject__paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about-poject__scheme">
                <div className="about-poject__scheme-back">
                    <p className="about-poject__scheme-element about-poject__scheme-element_back">1 неделя</p>
                    <p className="about-poject__scheme-subtitle">Back-end</p>
                </div>
                <div className="about-poject__scheme-front">
                    <p className="about-poject__scheme-element about-poject__scheme-element_front">4 недели</p>
                    <p className="about-poject__scheme-subtitle">Front-end</p>
                </div>
            </div>
        </div>
    );
}

export default AboutProject;