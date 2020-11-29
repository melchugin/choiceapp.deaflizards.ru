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

const MainPage = (props) => {
    const [ vacancies, setVacancies ] = React.useState([]);
    const [ open, setOpen ] = React.useState(props.created ? true : false);

    React.useState(() => {
        const fn = async () => {
            const rows = await getData('/api/v1/vacancies');
            setVacancies(rows ? rows.rows : []);
        };
        fn();
    }, []);

    return <Layout return={false} pageTitle="Вакансии" addButton={true}>
            <AppMenu />
            <div className={css.pageWrapper}>
                {vacancies.slice(0, 50).map(renderVacancy(props))}
            </div>
            <RecentContacts contacts={recentContactsMock()}/>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={open}
                message="Вакансия создана"
                onClose={() => setOpen(false)}
                />
    </Layout>
}

const renderVacancy = (props) => (item, i) => {
    const VacancyCardWithLink = withLink(VacancyCard, `/vacancy/${item.id}`);
    return <VacancyCardWithLink {...item}/>
};

MainPage.getInitialProps = (ctx) => {
    const { query = {} } = ctx;
    return { ...query };
};

export default MainPage;