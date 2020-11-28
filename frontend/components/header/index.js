import React from 'react';

import Button from '../button';

import Logo from '../icons/logo';
import AddIcon from '../icons/add';
import ReturnIcon from '../icons/return';

import withLink from '../hocs/withLink';

import css from './style.less';

const Header = (props) => (
    <div className={css.headerWrapper}>
        <div className={css.widthLimiter}>
        <header className={css.header}>
            <div className={css.logoWrapper}>
                <Logo />
                <h3 className={css.logoText}>choice</h3>
            </div>
            <div className={css.middleWrapper}>
                <div className={css.titleWithReturn}>
                    {props.return && <ReturnWithLink />}
                    <h4 className={css.pageTitle}>{props.pageTitle}</h4>
                </div>
                {props.addButton && 
                    <ButtonWithLink text="Создать вакансию">
                        <AddIcon />
                    </ButtonWithLink>}
            </div>
            <div className={css.user}>
                <span className={css.username}>
                    Кирилл Сидорец
                </span>
                <img src="/profile_photo.png" className={css.userphoto}/>
            </div>
            </header>
        </div>
    </div>
);

const ReturnWithLink = withLink(ReturnIcon, '/');
const ButtonWithLink = withLink(Button, '/add-vacancy');

export default Header;