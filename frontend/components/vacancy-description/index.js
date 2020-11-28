import React from 'react';

import List from '../list';

import css from './styles.less';

const photos = {
    responses: [{name:  'Валентин', src: '/vac1.png'},
    {name:  'Андрей', src: '/vac3.png'},
    {name:  'Петр', src: '/vac2.png'},
    {name:  'Валентин', src: '/vac1.png'},
    {name:  'Александр', src: '/vac4.png'},
    {name:  'Павел', src: '/vac2.png'},
    {name:  'Ктото', src: '/vac3.png'},
    {name:  'Семен', src: '/vac1.png'},
    {name:  'Игорь', src: '/vac4.png'},
    {name:  'Валерий', src: '/vac2.png'},
    {name:  'Валентин', src: '/vac1.png'}],
    additional: [
        {caption: 'Обязанности',
        items: [
            'Доработка CRM-системы в части реализации нового функционала;',
            'Доработка существующих и разработка новых отчётов для CRM-систем;',
            'Участие в процессе сопровождения CRM-системы на 3 линии поддержки в части устранения ошибок и оптимизации;',
        ]},
        {caption: 'Требования',
        items: [
            'Знание Oracle PL/SQL и JavaScript является обязательной частью;',
            'Желательные: .NET (C#, ASP);',
            'Знание TypeScript будет являться плюсом;',
            'Высшее образование;',
            'Желание расти и развиваться.'
        ]},
        {caption: 'Условия',
        items: [
            'Знание Oracle PL/SQL и JavaScript является обязательной частью;',
            'Желательные: .NET (C#, ASP);',
            'Знание TypeScript будет являться плюсом;',
            'Высшее образование;',
            'Желание расти и развиваться.'
        ]},
    ]
};

const VacancyDescription = (props) =>
    <div className={css.wrapper}>
        <div className={css.topPanel}>
            <div className={css.responses}>
                <span className={css.responsesText}>Отклики</span>
                <span className={css.responsesCount}>{props.responsesCount}</span>
            </div>
            <a className={css.moreLink}>Смотреть все</a>
        </div>
        <div className={css.photosWrapper}>
            {photos.responses.map(NamedPhoto)}
        </div>
            {photos.additional.map((item, i) => <List {...item} key={i}/>)}
    </div>

const NamedPhoto = (item, i) =>
    <div className={css.photoWrapper} key={i}>
        <img src={item.src}/>
        <span>{item.name}</span>
    </div>



export default VacancyDescription;