import React from 'react';

import Layout from '../../components/layout';
import AppMenu from '../../components/app-menu';
import VacancyDescription from '../../components/vacancy-description';

import '../../styles/global.less';
import css from '../../styles/regular.less';

const VacancyPage = () => 
    <Layout return={true} pageTitle="iOS-разработчик" addButton={false}>
            <AppMenu />
            <div className={css.pageWrapper}>
                <VacancyDescription responsesCount={14}/>
            </div>
    </Layout>

export default VacancyPage;