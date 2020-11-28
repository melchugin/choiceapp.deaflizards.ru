import React from 'react';

import css from './styles.less';

const recentContacts = (props) =>
    <div className={css.wrapper}>
        <h3>Недавние контакты</h3>
        {props.contacts.map(NamedPhoto)}
    </div>

const NamedPhoto = (item, i) =>
    <div className={css.photoWrapper} key={i}>
        <img src={item.src}/>
        <div>
            <h5>{item.name}</h5>
            <span>{item.desc}</span>
        </div>
        <img src="/icons/send-mail.svg"></img>
    </div>

export default recentContacts;