import React from 'react';

import ExplainedIcon from '../explained-icon';
import Input from '../input';
import EditableList from '../editable-list';

import withListedHorizontally from '../hocs/with-listed-horizontally';
import withInput from '../hocs/withInput';
import withStateObject from '../hocs/withStateObject';

import css from './styles.less';

const VacancyCreator = (props) =>
    <div className={css.root}>
        <div className={css.positions}>
            <h3>Должность</h3>
        </div>
        <PositionsList items={props.positions}/>
        <div className={css.description}>
            <h3>Описание</h3>
            <StatedInput rows={1} placeholder="Краткое описание вакансии"/>
        </div>
        <ListWithState initialState={{...demands}}/>
        <div className={css.publications}>
            <h4>Публикация на сервисах</h4>
            <div className={css.wrapper}>
                <div className={css.item}>
                    <div className={css.photoWrapper}>
                        <img src="/logo1.png" className={css.photo}/>
                        <img src="/markIcon.svg" className={css.photoAddition}/>
                    </div>
                </div>
                <div className={css.item}>
                    <div className={css.photoWrapper}>
                        <img src="/logo2.png" className={css.photo}/>
                        <img src="/markIcon.svg" className={css.photoAddition}/>
                    </div>
                </div>
            </div>
        </div> 
        <Button />
    </div>

const Button = (props) => <button className={css.button}>Создать</button>;

const PositionsList = withListedHorizontally(ExplainedIcon);
const StatedInput = withInput(Input);
const ListWithState = withStateObject(EditableList);

export default VacancyCreator;

const demands = {
    caption: 'Требования',
    items: [
        'Доработка CRM-системы в части реализации нового функционала;',
        'Доработка существующих и разработка новых интерфейсов для CRM-систем;',
        'Коммуникация с заказчиками и общение с командой разработки.',
    ]
};