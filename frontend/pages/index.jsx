import React from 'react';

import Layout from '../components/layout';
import AppMenu from '../components/app-menu';
import VacancyCard from '../components/vacancy-card';
import RecentContacts from '../components/recent-contacts';

import withLink from '../components/hocs/withLink';

import '../styles/global.less';
import css from '../styles/regular.less';

import recentContactsMock from './mocks/recent-contacts';

const MainPage = () => 
    <Layout return={false} pageTitle="Вакансии" addButton={true}>
            <AppMenu />
            <div className={css.pageWrapper}>
                <VacancyCardWithLink title="iOS-разработчик" additional="12 откликов"/>
                <ToChoice title="iOS-разработчик" additional="12 откликов"/>
                <VacancyCard title="iOS-разработчик" additional="12 откликов"/>
                <VacancyCard title="iOS-разработчик" additional="12 откликов"/>
                <VacancyCard title="iOS-разработчик" additional="12 откликов"/>
                <VacancyCard title="iOS-разработчик" additional="12 откликов"/>
                <VacancyCard title="iOS-разработчик" additional="12 откликов"/>
                <VacancyCard title="iOS-разработчик" additional="12 откликов"/>
                <VacancyCard title="iOS-разработчик" additional="12 откликов"/>
            </div>
            <RecentContacts contacts={recentContactsMock}/>
    </Layout>

const VacancyCardWithLink = withLink(VacancyCard, '/vacancy/1');
const ToChoice = withLink(VacancyCard, '/choose');

export default MainPage;