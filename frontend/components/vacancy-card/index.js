import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

import css from './styles.less';

const photoSrc = [
    "photos/1.svg",
    "photos/2.svg",
    "photos/3.svg",
    "photos/4.svg",
    "photos/2.svg",
    "photos/3.svg",
    "photos/1.svg",
];

const VacancyCard = (props) =>
    <div className={css.wrapper}>
        <div className={css.info}>
            <h4 className={css.title}>{props.title}</h4>
            <span className={css.additional}>{props.additional}</span>
        </div>
        <div className={css.photosWrapper}>
        <AvatarGroup max={4}>
            {photoSrc.map(PhotoItem)}
        </AvatarGroup>
        </div>
    </div>

const PhotoItem = (src, i) =>
    <Avatar src={src} />

export default VacancyCard;