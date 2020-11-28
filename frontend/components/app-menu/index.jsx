import React from 'react';
import Link from 'next/link';

import css from './style.less';

const AppMenu = () => 
    <ul className={css.list}>
        <Link href="/">
            <li className={css.item}>
                <img src="/icons/vacancy.svg" />
                <a>Вакансии</a>
            </li>
        </Link>
        <Link href="/people">
            <li className={css.item}>
                <img src="/icons/people.svg" />
                <a>Люди</a>
            </li>
        </Link>
        <Link href="/mail">
            <li className={css.item}>
                <img src="/icons/mail.svg" />
                <a>Сообщения</a>
            </li>
        </Link>
    </ul>

export default AppMenu;