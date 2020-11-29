import React from 'react';
import { getData } from '../lib/request';

import Layout from '../components/layout';
import AppMenu from '../components/app-menu';
import IconInput from '../components/icon-input';
import MyInput from '../components/input';
import EditableList from '../components/editable-list';
import SideMenu from '../components/side-menu';

import withOpen from '../components/hocs/withOpen';

import '../styles/global.less';
import regCss from '../styles/regular.less';
import css from './add-vacancy.less';
//
import demands from '../mocks/demands';

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
import withLink from '../components/hocs/withLink';

const AddVacancy = (props) => {
    const [ positions, setPositions ] = React.useState([]);
    const [ positionsInitial, setPositionsInitial ] = React.useState([]);
    const [ search, setSearch ] = React.useState('');
    const [ currentPosition, setCurrentPosition ] = React.useState(null);
    const [ url, setUrl ] = React.useState('');
    const [ manager, setManager ] = React.useState('');
    const [ showVac, setShowVac ] = React.useState('show');
    const [ currentTab, setCurrentTab ] = React.useState(0);
    const [ currentPage, setCurrentPage ]= React.useState(0);
    const [ phone, setPhone ] = React.useState('');
    const [ workType, setWorkType ] = React.useState('full');
    const [ description, setDescription ] = React.useState('');
    const [ demands, setDemands ] = React.useState({caption: 'Требования', items: ['']});
    const [ salary, setSalary ] = React.useState('');
    const [ workExperience, setWorkExperience ] = React.useState('');
    const [ education, setEducation ] = React.useState('');

    React.useEffect(() => {
        const fn = async () => {
            const rows = await getData('/api/v1/positions');
            setPositions(rows.rows);
            setPositionsInitial(rows.rows);
        };
        fn();
    }, []);

    React.useEffect(() => {
        const fn = async () => {
            if (search == '') setPositions(positionsInitial);
            else {
                setPositions(positions.filter(v => v.name.includes(search)))
            }
        };
        fn();
    }, [search]);

    React.useEffect(() => {
        const fn = async () => {
            if (currentPosition) {
                const rows = await getData(`/api/v1/position/${currentPosition}`);
                console.log(rows.rows[0])
                setDescription(rows.rows[0].description);
                setEducation(rows.rows[0].education);
                setSalary(rows.rows[0].salary.filter(v => v !== 0).join(' - '));
                setWorkExperience(rows.rows[0].work_experience.filter(v => v !== 0).join(' - '));
            } else {
                setDescription('');
                setEducation('');
                setSalary([]);
                setWorkExperience([]);
            }
        };
        fn();
    }, [currentPosition])
    const sideMenuItems = [ {name: 'Основная информация', icon: InfoIcon}, {name: 'Контакты', icon: PersonIcon}];
    return <Layout return={true} pageTitle="Новая вакансия" addButton={false}>
            <AppMenu />
            <div className={regCss.pageWrapper}>
                {currentPage === 0 && <><div className={css.pageTabs}>
                    {tabs.map(renderTab(currentTab, setCurrentTab))}
                </div>
                {tabsSwitcher({
                    ...props,url, setUrl, positions,
                    search, setSearch,
                    currentPosition, setCurrentPosition,
                    workType, setWorkType,
                    description, setDescription,
                    demands, setDemands,
                    workExperience, setWorkExperience,
                    salary, setSalary,
                    education, setEducation
                    })(currentTab)}</>}
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
            <SideMenu page={currentPage} setPage={setCurrentPage} items={sideMenuItems} />
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

const tabsSwitcher = (props) => (current) => {
    switch (current) {
        case 0: return (
            <div className={css.tabContent}>
                <Positions
                    positions={props.positions}
                    search={props.search}
                    setSearch={props.setSearch}
                    current={props.currentPosition}
                    setCurrent={props.setCurrentPosition} />
                <Description description={props.description} setDescription={props.setDescription}/>
                <Demands demands={props.demands} setDemands={props.setDemands}/>
                <WorkExperience text={props.workExperience} setText={props.setWorkExperience}/>
                <Education text={props.education} setText={props.setEducation}/>
                <Salary text={props.salary} setText={props.setSalary}/>
                <WorkType selected={props.workType} setSelected={props.setWorkType}/>
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
    return (
        <div className={css.positionsWrapper}>
            <h3>Должность</h3>
            <IconInput placeholder="Поиск по должностям" text={props.search} setText={props.setSearch} name="position"/>
            <div className={css.overflowContainer}>
                <div className={css.positionsList}>
                    {props.positions.slice(0, 10).map(renderPosition(props.current, props.setCurrent))}
                </div>
            </div>
        </div>
    );
};

const renderPosition = (current, setCurrent) => (item, i) => {
    const color = current == item.id ? '#FFFFFF' : 'black';
    const background = current == item.id ? '#17AAD9' : '#EBEDF0';
    return (
    <button
        style={{ color, background }}
        className={css.positionButton}
        key={item.id}
        onClick={() => setCurrent(item.id)}>
            {item.name}
    </button>
    );
}

const Description = (props) => {
    return (
        <div className={css.descriptionWrapper}>
            <h3>Описание</h3>
            <MyInput placeholder="Введите описание вакансии" text={props.description} setText={props.setDescription} name="description" rows={2}/>
        </div>
    );
};

const WorkExperience = (props) => {
    return (
        <div className={css.descriptionWrapper}>
            <h3>Опыт работы</h3>
            <MyInput placeholder="Опыт работы" text={props.text} setText={props.setText} name="description" rows={2}/>
        </div>
    );
};

const Salary = (props) => {
    return (
        <div className={css.descriptionWrapper}>
            <h3>Заработная плата</h3>
            <MyInput placeholder="Заработная плата" text={props.text} setText={props.setText} name="description" rows={2}/>
        </div>
    );
};

const Education = (props) => {
    return (
        <div className={css.descriptionWrapper}>
            <h3>Образование</h3>
            <MyInput placeholder="Образование" text={props.text} setText={props.setText} name="description" rows={2}/>
        </div>
    );
};

const Demands = (props) => {
    const addDemand = () => () => props.setDemands({caption: props.demands.caption, items: [...props.demands.items, '']});
    const removeDemand = (i) => () => props.setDemands({caption: props.demands.caption, items: [props.demands.items.filter((v, index) => i !== index)]});
    return (
        <div className={css.demandWrapper}>
            <EditableList
            caption={props.demands.caption}
            items={props.demands.items}
            add={addDemand}
            remove={removeDemand}/>
        </div>
    );
};

const WorkType = (props) => {
    return (
        <Box paddingTop={4} borderBottom={1}>
        <FormControl component="fieldset">
            <FormLabel component="legend">Тип занятости</FormLabel>
            <RadioGroup name="work-type" value={props.selected} onChange={(e) => props.setSelected(e.target.value)}>
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

const ButtonCreate = (props) => <button className={css.button}>Создать</button>;

const Button = withLink(ButtonCreate, '/?created=true');

export default withOpen(AddVacancy);