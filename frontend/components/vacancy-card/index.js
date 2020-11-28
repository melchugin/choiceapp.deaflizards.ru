import React from 'react';

import css from './styles.less';

const photoSrc = [
    "/vac1.png",
    "/vac2.png",
    "/vac3.png",
    "/vac4.png"
];

const VacancyCard = (props) =>
    <div className={css.wrapper}>
        <div className={css.info}>
            <h4 className={css.title}>{props.title}</h4>
            <span className={css.additional}>{props.additional}</span>
        </div>
        <div className={css.photosWrapper}>
            {photoSrc.map(PhotoItem)}
            <div className={css.morePhotos}>+6</div>
        </div>
    </div>

const PhotoItem = (src, i) =>
    <img className={css.photo} src={src} key={i} style={{ transform: `translateX(${12*i}px)` }}/>

export default VacancyCard;