import React from 'react';
import { getData } from '../lib/request';

import Layout from '../components/layout';
import AppMenu from '../components/app-menu';
import VacancyCard from '../components/vacancy-card';
import RecentContacts from '../components/recent-contacts';
import Snackbar from '@material-ui/core/Snackbar';

import withLink from '../components/hocs/withLink';

import '../styles/global.less';
import css from '../styles/regular.less';

import recentContactsMock from '../mocks/recent-contacts';

const MailPage = (props) => {
    return <Layout return={false} pageTitle="Сообщения" addButton={true}>
            <AppMenu />
            <div className={css.pageWrapper}>
            </div>
            <RecentContacts contacts={recentContactsMock()}/>
    </Layout>
}

export default MailPage;