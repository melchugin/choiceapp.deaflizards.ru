import React from 'react';
import { getData } from '../../lib/request';

import Layout from '../../components/layout';
import AppMenu from '../../components/app-menu';
import VacancyDescription from '../../components/vacancy-description';
import SideMenu from '../../components/side-menu';

import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';

import SearchIcon from '@material-ui/icons/Search';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import InfoIcon from '@material-ui/icons/Info';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import PersonIcon from '@material-ui/icons/Person';

import '../../styles/global.less';
import css from '../../styles/regular.less';

import withLink from '../../components/hocs/withLink';

import responsesMock from '../../mocks/responses';

const VacancyPage = (props) => {
    const [ currentPage, setCurrentPage ]= React.useState(0);
    const [newResponses, setNewResponses] = React.useState([]);
    const [watchedResponses, setWatchedResponses] = React.useState([]);
    const [ pageTitle, setPageTitle ]= React.useState('');
    const random = Math.random() * 10 + 1;

    React.useState(() => {
        const fn = async () => {
            const rows = await getData(`/api/v1/vacancy/${props.id}`);
            setNewResponses(rows ? rows.rows.slice(0, random).sort((a,b) => b.percent - a.percent) : []);
            setWatchedResponses(rows ? rows.rows.slice(random+1).sort((a,b) => b.percent - a.percent) : []);
            setPageTitle(rows ? rows.rows[0].name : []);
        };
        fn();
    }, []);

    const sideMenuItems = [
        {name: `Отклики ${newResponses.length + watchedResponses.length}`, icon: AllInboxIcon},
        {name: 'Описание вакансии', icon: InfoIcon},
        {name: 'Тестовые задания', icon: BusinessCenterIcon},
        {name: 'Контактное лицо', icon: PersonIcon},
    ];
    return (
        <Layout return={true} pageTitle={pageTitle} addButton={false}>
                <AppMenu />
                <div className={css.pageWrapper}>
                    <Box paddingTop={2} paddingBottom={2}>
                        <Typography variant="h6">Отклики на вакансию</Typography>
                        <FormControl style={{ width: '100%'}}>
                            <Input
                            id="responses-search"
                            fullWidth
                            placeholder="Поиск"
                            startAdornment={
                                <InputAdornment position="start">
                                <SearchIcon />
                                </InputAdornment>
                            }
                            />
                        </FormControl>
                    </Box>
                    <Box maxHeight="75vh" overflow="auto">
                        <Badge badgeContent={newResponses.length} anchorOrigin={{
                                                                    vertical: 'bottom',
                                                                    horizontal: 'right',
                                                                    }}
                                color="error"
                        >
                            <Typography variant="subtitle1">Новые</Typography>
                        </Badge>
                            {newResponses.map(renderResponses)}
                        <Typography variant="subtitle1">Просмотренные</Typography>
                            {watchedResponses.map(renderResponses)}
                    </Box>
                </div>
                <SideMenu page={currentPage} setPage={setCurrentPage} items={sideMenuItems}/>
        </Layout>
    );
}

const renderResponses = (response, i) => {
    const LinkedButton = withLink(Response, '/response/'+response.resume_id);
    return (
        <Box display='flex' alignItems='center' justifyContent="space-between" paddingTop={2} key={i}>
            <LinkedButton {...response}/>
            <Box justifySelf="flex-end">
                {buttonSwitcher(response.quest)}
            </Box>
        </Box>
    );
};

const Response = (props) => {
    const color = props.percent > 50 ? props.percent > 70 ? '#4BB34B' : '#FFA000' : '#818C99';
    return <Box display='flex' alignItems='center'>
        <Avatar src={props.photo} style={{ width: '48px', height: '48px'}}/>
        <Box paddingLeft={1} display='flex' align-items='center' justifyContent="space-between">
            <Box>
                <Typography variant="subtitle1">{props.name}</Typography>
                <Typography variant="caption" style={{ color }}>Подходит на {props.percent}%</Typography>
            </Box>
        </Box>
    </Box>
};

const buttonSwitcher = (value) => {
    switch (value) {
        case 1: return <Button disabled>Тестовое отправлено</Button>
        case 0: return <Button style={{ color: '#17AAD9'}}>Отправить тестовое</Button>;
        case -1: return <Button disabled style={{ color: '#E64646'}}>Отказано</Button>;
    }
};

VacancyPage.getInitialProps = (ctx) => {
    return {id: ctx.query.id}
};

export default VacancyPage;