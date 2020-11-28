import React from 'react';

import css from './styles.less';

const List = (props) =>
    <div className={css.wrapper}>
        <h4 className={css.caption}>{props.caption}</h4>
        <ul className={css.list}>
            {props.items.map(ListItem)}
        </ul>
    </div>

const ListItem = (item, i) =>
    <li className={css.listItem} key={i}>{item}</li>

export default List;