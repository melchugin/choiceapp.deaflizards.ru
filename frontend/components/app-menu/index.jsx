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
            <li className={css.item}>
                <img src="/icons/people.svg" />
                <div>Люди</div>
            </li>
            <li className={css.item}>
                <img src="/icons/mail.svg" />
                <div>Сообщения</div>
            </li>
    </ul>

export default AppMenu;