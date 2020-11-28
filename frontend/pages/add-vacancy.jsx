import React from 'react';

import Layout from '../components/layout';
import AppMenu from '../components/app-menu';
import IconInput from '../components/icon-input';
import Input from '../components/input';
import EditableList from '../components/editable-list';

import withOpen from '../components/hocs/withOpen';

import '../styles/global.less';
import regCss from '../styles/regular.less';
import css from './add-vacancy.less';

import positions from './mocks/positions';
import demands from './mocks/demands';

const AddVacancy = (props) => {
    const [ currentTab, setCurrentTab ] = React.useState(0);
    return <Layout return={true} pageTitle="Новая вакансия" addButton={false}>
            <AppMenu />
            <div className={regCss.pageWrapper}>
                <div className={css.pageTabs}>
                    {tabs.map(renderTab(currentTab, setCurrentTab))}
                </div>
                {tabsSwitcher(currentTab)}
            </div>
    </Layout>
};

const renderTab = (current, setCurrent) => (item, i) => {
    const color = current === i ? 'black' : '#818C99';
    const borderBottom = current === i ? '2px solid #17AAD9' : 'none';
    return <button className={css.pageTab} onClick={() => setCurrent(i)} key={i} style={{ color, borderBottom }}>
        {item}
    </button>
};

const tabs = ['С нуля', 'Из резюме', 'Из вакансии'];

const tabsSwitcher = (current) => {
    switch (current) {
        case 0: return (
            <div className={css.tabContent}>
                <Positions positions={positions}/>
                <Description />
                <Demands demands={demands}/>
                <Publications />
                <Button />
            </div>
        );
        case 1: return (
            <div>

            </div>
        );
        case 2: return (
            <div>

            </div>
        );
    }
};

const Positions = (props) => {
    const [ positions, setPositions ] = React.useState(props.positions)
    const [ current, setCurrent ] = React.useState(0);
    const [ search, setSearch ] = React.useState('');
    return (
        <div className={css.positionsWrapper}>
            <h3>Должность</h3>
            <IconInput placeholder="Поиск по должностям" text={search} setText={setSearch} name="position"/>
            <div className={css.overflowContainer}>
                <div className={css.positionsList}>
                    {positions.map(renderPosition(current, setCurrent))}
                </div>
            </div>
        </div>
    );
};

const renderPosition = (current, setCurrent) => (item, i) => {
    const color = current === i ? '#FFFFFF' : 'black';
    const background = current === i ? '#17AAD9' : '#EBEDF0';
    return (
    <button
        style={{ color, background }}
        className={css.positionButton}
        key={i}
        onClick={() => setCurrent(i)}>
            {item.name}
    </button>
    );
}

const Description = (props) => {
    const [ description, setDescription ] = React.useState('');
    return (
        <div className={css.descriptionWrapper}>
            <h3>Описание</h3>
            <Input placeholder="Введите описание вакансии" text={description} setText={setDescription} name="description" rows={2}/>
        </div>
    );
};

const Demands = (props) => {
    const [ demands, update ] = React.useState(props.demands.items);
    const addDemand = () => () => update([...demands, '']);
    const removeDemand = (i) => () => update(demands.filter((v, index) => i !== index));

    return (
        <div className={css.demandWrapper}>
            <EditableList
            caption={props.demands.caption}
            items={demands}
            add={addDemand}
            remove={removeDemand}/>
        </div>
    );
};

const Publications = (props) => {
    return (
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
    );
};

const Button = (props) => <button className={css.button}>Создать</button>;

export default withOpen(AddVacancy);