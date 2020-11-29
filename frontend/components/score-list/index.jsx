import React from 'react';

import Progress from '../../components/progress';

import css from './styles.less';

const ScoreList = (props) =>
    <div className={css.wrapper}>
        <h4 className={css.caption}>{props.caption}</h4>
        <ul className={css.list}>
            {props.items.map(ScoreItem)}
        </ul>
    </div>

const ScoreItem = (item, i) => {
    return (
        <li className={css.item} key={i}>
        <Progress radius={19} stroke={2} score={item.score}/>
        <span>{item.name}</span>
        </li>
    )
}

export default ScoreList;