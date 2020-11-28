import React from 'react';

import IconInput from '../icon-input';

import withInput from '../hocs/withInput';

import css from './styles.less';

const positions = [
    'iOS-разработчик',
    'Android-разработчик',
    'ML-разработчик',
    'Продуктовый дизайнер',
    'iOS-разработчик',
    'Android-разработчик',
    'ML-разработчик',
    'Продуктовый дизайнер',
    'iOS-разработчик'
];

const PortalSearch = (props) =>
    <div className={css.wrapper}>
        <h2 className={css.caption}>Должность</h2>
        <IconInput 
            placeholder={'Поиск'}
            text={props.text}
            setText={props.setText}/>
        <ul className={css.list}>
            {positions.filter((v => v.toLowerCase().includes(props.text.toLowerCase()))).map(ListItems)}
        </ul>
        <Button />
        <CloseButton close={props.close}/>
    </div>

const ListItems = (item, i) => <li className={css.listItem} key={i}>{item}</li>;
const Button = (props) => <button className={css.button}>Сохранить</button>;
const CloseButton = (props) => <button className={css.closeButton} onClick={props.close}>X</button>

export default withInput(PortalSearch);