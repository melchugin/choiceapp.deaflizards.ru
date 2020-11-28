import React from 'react';

import Layout from '../components/layout';
import AppMenu from '../components/app-menu';
import Button from '../components/button';
import PortalSearch from '../components/portal-search';
import VacancyCreator from '../components/vacancy-creator';

import withPadding from '../components/hocs/withPadding';
import withOpen from '../components/hocs/withOpen';

import '../styles/global.less';
import css from '../styles/regular.less';

const AddVacancy = (props) => 
    <Layout return={true} pageTitle="Новая вакансия" addButton={false}>
            <AppMenu />
            <div className={css.pageWrapper}>
                <VacancyCreator positions={positions}/>
            </div>
    </Layout>

const PaddedButton = withPadding(Button);

export default withOpen(AddVacancy);

const positions = [
    {
        id: 0,
        name: 'Добавить должность',
        icon: '/addIcon.svg'
    },
{
    id: 0,
    name: 'Data Engineer',
    icon: '/vac1.png'
},
{
    id: 0,
    name: 'Дизайнер интерфейсов',
    icon: '/vac1.png'
},
{
    id: 0,
    name: 'QA-инженер',
    icon: '/vac1.png'
},
{
    id: 0,
    name: 'Go-разработчик',
    icon: '/vac1.png'
},
{
    id: 0,
    name: 'Android-разработчик',
    icon: '/vac1.png'
},
{
    id: 0,
    name: '123',
    icon: '/vac1.png'
}];