import React from 'react';

import css from './styles.less';

const ExplainedIcon = (props) =>
    <li className={css.explainedIcon}>
        <div className={css.imgBackground}>
            <img src={props.item.icon} />
        </div>
        <span>{props.item.name}</span>
    </li>

export default ExplainedIcon;