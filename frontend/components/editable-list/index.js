import React from 'react';

import Input from '../input';

import withInput from '../hocs/withInput';

import css from './styles.less';

const EditableList = (props) =>
    <div className={css.wrapper}>
        <h3>{props.state.caption}</h3>
        <ul>
            {props.state.items.map(Item(props))}
        </ul>
        <button className={css.addButton} 
            onClick={props.setState({caption:props.state.caption, items: [...props.state.items, '']})}>
            <div className={css.iconWrapper}>
                <img src="/addIcon.svg" />
            </div>
            Добавить
        </button>
    </div>

const Item = (props) => (item, i) =>
    <li key={i}>
        <button className={css.removeButton} 
            onClick={props.setState({caption:props.state.caption, items: props.state.items.filter((v, index) => i !== index)})}>-</button>
        <StatedInput rows={1} value={item}/>
    </li>

const StatedInput = withInput(Input, );

export default EditableList;