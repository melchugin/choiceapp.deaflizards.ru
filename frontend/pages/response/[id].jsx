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

import responsesMock from '../mocks/responses';

const VacancyPage = () => {
    const [ currentPage, setCurrentPage ]= React.useState(0);
    return (
        <Layout return={true} pageTitle="iOS-разработчик" addButton={false}>
                <AppMenu />
                <div className={css.pageWrapper}>

                </div>
                <SideMenu page={currentPage} setPage={setCurrentPage}/>
        </Layout>
    );
}

const SideMenu = (props) => {
    return (
        <List component="div">
            <ListItem button selected={props.page === 0} onClick={() => props.setPage(0)}>
            <ListItemIcon>
                <InfoIcon style={{color: '#17AAD9'}}/>
            </ListItemIcon>
            <ListItemText primary="Основная информация" style={{color: 'black'}}/>
            </ListItem>
            <ListItem button selected={props.page === 1} onClick={() => props.setPage(1)}>
            <ListItemIcon>
                <BusinessCenterIcon style={{color: '#17AAD9'}}/>
            </ListItemIcon>
            <ListItemText primary="Места работы" style={{color: 'black'}}/>
            </ListItem>
            <ListItem button selected={props.page === 2} onClick={() => props.setPage(2)}>
            <ListItemIcon>
                <PersonIcon style={{color: '#17AAD9'}}/>
            </ListItemIcon>
            <ListItemText primary="Контакты" style={{color: 'black'}}/>
            </ListItem>
        </List>
    )
};

export default VacancyPage;