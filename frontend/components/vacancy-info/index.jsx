import React from 'react';

import ScoreList from '../score-list';

import withLink from '../hocs/withLink';

import ReturnIcon from '../icons/return';

import css from './styles.less';

const skills = [
    {
        caption: 'Мягкие навыки',
        items: [
            {name: 'Адекватность', score: 9},
            {name: 'Адекватность', score: 10},
            {name: 'Коммуникативность', score: 9},
            {name: 'Самостоятельность', score: 2},
        ]
    },
    {
        caption: 'Жёсткие навыки',
        items: [
            {name: 'iOS-разработка', score: 9},
            {name: 'Дизайн', score: 6},
            {name: 'Аналитика', score: 4},
        ]
    },
];

const VacancyInfo = (props) =>
    <div className={css.wrapper}>
        <div className={css.heading}>
            <LinkedReturnIcon />
            <h2>{props.caption}</h2>
        </div>
        <div className={css.warning}>
            <h3>Требования к кандидатам</h3>
            <span>
                Обратите внимание на требования ниже,
                именно такие по статистике требуются
                кандидатам на позиции iOS-разработчик
            </span>
        </div>
        <ScoreList {...skills[0]}/>
        <ScoreList {...skills[1]}/>
        <div className={css.additional}>
            <h4>Обратите внимание</h4>
            <span>
                В первую очередь обращайте внимание на такие показатели, как адекватность и желание учиться. Для вакансии iOS-разработчик — это наиболее важно.
            </span>
        </div>
        <div className={css.master}>
            <h4>Будущий руководитель</h4>
            <div className={css.masterWrapper}>
                <img src='/vac1.png'/>
                <div className={css.masterInfo}>
                    <h5>Александр Фёдоров</h5>
                    <span>Команда разработки</span>
                </div>
            </div>
        </div>
    </div>

const LinkedReturnIcon = withLink(ReturnIcon, '/');

export default VacancyInfo;