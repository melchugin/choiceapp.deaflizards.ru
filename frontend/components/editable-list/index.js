import React from 'react';

import Input from '../input';

import withInput from '../hocs/withInput';

import css from './styles.less';

const EditableList = (props) =>
    <div className={css.wrapper}>
        <h3>{props.caption}</h3>
        <ul>
            {props.items.map(Item(props))}
        </ul>
        <button className={css.addButton}
            onClick={props.add()}>
            <div className={css.iconWrapper}>
                <img src="/addIcon.svg" />
            </div>
            Добавить
        </button>
    </div>

const Item = (props) => (item, i) =>
    <li key={i}>
        <button className={css.removeButton}
            onClick={props.remove(i)}>-</button>
        <StatedInput rows={1} value={item}/>
    </li>

const StatedInput = withInput(Input, );

export default EditableList;
