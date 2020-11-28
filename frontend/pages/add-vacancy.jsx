import React from 'react';

import Layout from '../components/layout';
import AppMenu from '../components/app-menu';
import IconInput from '../components/icon-input';
import MyInput from '../components/input';
import EditableList from '../components/editable-list';

import withOpen from '../components/hocs/withOpen';

import '../styles/global.less';
import regCss from '../styles/regular.less';
import css from './add-vacancy.less';

import positions from './mocks/positions';
import demands from './mocks/demands';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';

import InfoIcon from '@material-ui/icons/Info';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';

const AddVacancy = (props) => {
    const [ url, setUrl ] = React.useState('');
    const [ manager, setManager ] = React.useState('');
    const [ showVac, setShowVac ] = React.useState('show');
    const [ currentTab, setCurrentTab ] = React.useState(0);
    const [ currentPage, setCurrentPage ]= React.useState(0);
    const [ phone, setPhone ] = React.useState('');
    return <Layout return={true} pageTitle="Новая вакансия" addButton={false}>
            <AppMenu />
            <div className={regCss.pageWrapper}>
                {currentPage === 0 && <><div className={css.pageTabs}>
                    {tabs.map(renderTab(currentTab, setCurrentTab))}
                </div>
                {tabsSwitcher({...props, url, setUrl})(currentTab)}</>}
                {currentPage === 1 && (
                    <Box display='flex' paddingTop={2} paddingBottom={2} flexDirection='column'>
                        <Typography variant="h6">Контактное лицо</Typography>
                        <TextField label="Менеджер вакансии" fullWidth value={manager} onChange={(e) => setManager(e.target.value)} />
                        <Box paddingTop={2}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">ОТОБРАЖЕНИЕ КОНТАКТОВ</FormLabel>
                                <RadioGroup name="work-type" value={showVac} onChange={(e) => setShowVac(e.target.value)}>
                                    <FormControlLabel value="show" control={<Radio style={{ color: '#17AAD9'}}/>} label="Не показывать в вакансии" />
                                    <FormControlLabel value="hide" control={<Radio style={{ color: '#17AAD9'}}/>} label="Показывать в вакансии" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <TextField label="Телефон" fullWidth value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </Box>
                )}
            </div>
            <SideMenu page={currentPage} setPage={setCurrentPage}/>
    </Layout>
};

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
                <PersonIcon style={{color: '#17AAD9'}}/>
            </ListItemIcon>
            <ListItemText primary="Контакты" style={{color: 'black'}}/>
            </ListItem>
        </List>
    )
};

const renderTab = (current, setCurrent) => (item, i) => {
    const color = current === i ? 'black' : '#818C99';
    const borderBottom = current === i ? '2px solid #17AAD9' : 'none';
    return <button className={css.pageTab} onClick={() => setCurrent(i)} key={i} style={{ color, borderBottom }}>
        {item}
    </button>
};

const tabs = ['С нуля', 'Из резюме', 'Из вакансии'];

const tabsSwitcher = (props) => (current) => {
    switch (current) {
        case 0: return (
            <div className={css.tabContent}>
                <Positions positions={positions}/>
                <Description />
                <Demands demands={demands}/>
                <WorkType />
                <Publications />
                <Button />
            </div>
        );
        case 1: return (
            <div className={css.tabContent}>
                <ImportType />
                <ColleaguesSearch />
                <Button />
            </div>
        );
        case 2:
            return (
            <div className={css.tabContent}>
                <Box display='flex' alignItems='center' paddingTop={2} paddingBottom={2}>
                    <Avatar src="/logo2.png" style={{ width: '72px', height: '72px'}}/>
                    <Box paddingLeft={1}>
                        <Typography variant="h6">Импорт из HeadHunter</Typography>
                        <Typography variant="caption">Введите ссылку на вакансию или готовое резюме, чтобы автоматически сгенерировать вакансию</Typography>
                    </Box>
                </Box>
                <TextField label="Ссылка на вакансию" placeholder="Введите ссылку" value={props.url} onChange={(e) => props.setUrl(e.target.value)} />
                <Button />
            </div>
        );
    }
};

const ImportType = (props) => {
    const [ selected, setSelected ] = React.useState('colleagues');
    return (
        <Box paddingTop={3} paddingBottom={3} borderBottom={1}>
        <FormControl component="fieldset">
            <FormLabel component="legend">Тип импорта</FormLabel>
            <RadioGroup name="import-type" value={selected} onChange={(e) => setSelected(e.target.value)}>
                <FormControlLabel value="colleagues" control={<Radio style={{ color: '#17AAD9'}}/>} label="Из сотрудников компании" />
                <FormControlLabel value="hh" control={<Radio style={{ color: '#17AAD9'}}/>} label="Из HeadHunter" />
            </RadioGroup>
        </FormControl>
        </Box>
    );
};

const ColleaguesSearch = (props) => {
    return (
        <Box paddingTop={3}>
            <Typography gutterBottom>
                Сотрудники компании
            </Typography>
            <FormControl style={{ width: '100%'}}>
                <Input
                id="colleague-search"
                fullWidth
                placeholder="Поиск"
                startAdornment={
                    <InputAdornment position="start">
                    <SearchIcon />
                    </InputAdornment>
                }
                />
            </FormControl>
            <Box overflow="scroll" maxHeight='40vh'>
                <Box display='flex' alignItems='center' paddingTop={2}>
                    <Avatar src="/photos/1.svg" style={{ width: '48px', height: '48px'}}/>
                    <Box paddingLeft={1}>
                        <Typography variant="subtitle1">Евгений Котляров</Typography>
                        <Typography variant="caption">Отдел тестирования</Typography>
                    </Box>
                </Box>
                <Box display='flex' alignItems='center' paddingTop={2}>
                    <Avatar src="/photos/2.svg" style={{ width: '48px', height: '48px'}}/>
                    <Box paddingLeft={1}>
                        <Typography variant="subtitle1">Игорь Фёдоров</Typography>
                        <Typography variant="caption">Департамент дизайна</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
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
            <MyInput placeholder="Введите описание вакансии" text={description} setText={setDescription} name="description" rows={2}/>
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

const WorkType = (props) => {
    const [ selected, setSelected ] = React.useState('full');
    return (
        <Box paddingTop={4} borderBottom={1}>
        <FormControl component="fieldset">
            <FormLabel component="legend">Тип занятости</FormLabel>
            <RadioGroup name="work-type" value={selected} onChange={(e) => setSelected(e.target.value)}>
                <FormControlLabel value="full" control={<Radio style={{ color: '#17AAD9'}}/>} label="Полная занятость" />
                <FormControlLabel value="partial" control={<Radio style={{ color: '#17AAD9'}}/>} label="Частичная занятость" />
                <FormControlLabel value="once" control={<Radio style={{ color: '#17AAD9'}}/>} label="Проектная работа или разовое задание" />
                <FormControlLabel value="voluntary" control={<Radio style={{ color: '#17AAD9'}}/>} label="Волонтерство" />
                <FormControlLabel value="staging" control={<Radio style={{ color: '#17AAD9'}}/>} label="Стажировка" />
            </RadioGroup>
        </FormControl>
        </Box>
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