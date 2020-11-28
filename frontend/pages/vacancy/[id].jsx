import React from 'react';

import Layout from '../../components/layout';
import AppMenu from '../../components/app-menu';
import VacancyDescription from '../../components/vacancy-description';

import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
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

const VacancyPage = () => {
    const [ currentPage, setCurrentPage ]= React.useState(0);
    const [newResponses, setNewResponses] = React.useState(responsesMock().new);
    const [watchedResponses, setWatchedResponses] = React.useState(responsesMock().watched);
    React.useEffect(() => {
        setNewResponses(newResponses.sort((a,b) => b.percentage - a.percentage));
        setWatchedResponses(watchedResponses.sort((a,b) => b.percentage - a.percentage));
    }, []);
    return (
        <Layout return={true} pageTitle="iOS-разработчик" addButton={false}>
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
                    <Box maxHeight="75vh" overflow="scroll">
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
                <SideMenu page={currentPage} setPage={setCurrentPage} responsesCount={newResponses.length + watchedResponses.length}/>
        </Layout>
    );
}

const SideMenu = (props) => {
    return (
        <List component="div">
            <ListItem button selected={props.page === 0} onClick={() => props.setPage(0)}>
            <ListItemIcon>
                <AllInboxIcon style={{color: '#17AAD9'}}/>
            </ListItemIcon>
            <ListItemText primary={`Отклики ${props.responsesCount}`} style={{color: 'black'}}/>
            </ListItem>
            <ListItem button selected={props.page === 1} onClick={() => props.setPage(1)}>
            <ListItemIcon>
                <InfoIcon style={{color: '#17AAD9'}}/>
            </ListItemIcon>
            <ListItemText primary="Описание вакансии" style={{color: 'black'}}/>
            </ListItem>
            <ListItem button selected={props.page === 2} onClick={() => props.setPage(2)}>
            <ListItemIcon>
                <BusinessCenterIcon style={{color: '#17AAD9'}}/>
            </ListItemIcon>
            <ListItemText primary="Тестовые задания" style={{color: 'black'}}/>
            </ListItem>
            <ListItem button selected={props.page === 3} onClick={() => props.setPage(3)}>
            <ListItemIcon>
                <PersonIcon style={{color: '#17AAD9'}}/>
            </ListItemIcon>
            <ListItemText primary="Контактное лицо" style={{color: 'black'}}/>
            </ListItem>
        </List>
    )
};

const renderResponses = (response, i) => {
    const LinkedButton = withLink(Response, '/response/'+response.id);
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
    const color = props.percentage > 50 ? props.percentage > 70 ? '#4BB34B' : '#FFA000' : '#818C99';
    return <Box display='flex' alignItems='center'>
        <Avatar src={props.photo} style={{ width: '48px', height: '48px'}}/>
        <Box paddingLeft={1} display='flex' align-items='center' justifyContent="space-between">
            <Box>
                <Typography variant="subtitle1">{props.name}</Typography>
                <Typography variant="caption" style={{ color }}>Подходит на {props.percentage}%</Typography>
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

export default VacancyPage;