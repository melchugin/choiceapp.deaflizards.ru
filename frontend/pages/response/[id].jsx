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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LinearProgress from '@material-ui/core/LinearProgress';

import InfoIcon from '@material-ui/icons/Info';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import PersonIcon from '@material-ui/icons/Person';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';

import '../../styles/global.less';
import css from '../../styles/regular.less';

const ResponsePage = (props) => {
    const [ currentPage, setCurrentPage ] = React.useState(0);
    const [ resume, setResume ] = React.useState({});
    const sideMenuItems = [
        {name: 'Основная информация', icon: InfoIcon},
        {name: 'Места работы', icon: BusinessCenterIcon},
        {name: 'Контакты', icon: PersonIcon},
    ];

    React.useState(() => {
        const fn = async () => {
            const rows = await getData(`/api/v1/response/${props.id}`);
            console.log(rows ? rows.rows : []);
            setResume(rows ? rows.rows[0] : []);
        };
        fn();
    }, []);

    return (
        <Layout return={true} pageTitle={resume.name} addButton={false}>
                <AppMenu />
                <div className={css.pageWrapper}>
                    {pageSwitcher({...props, ...resume})(currentPage)}
                </div>
                <SideMenu page={currentPage} setPage={setCurrentPage} items={sideMenuItems}/>
        </Layout>
    );
}

const letter = `Здравствуйте! Ваша компания опубликовала вакансию на замещение должности юриста на сайте. Мой юридический стаж составляет 12 лет, есть серьезный опыт в юриспруденции, и мне бы хотелось предложить Вам свою профессиональную помощь. Я окончил институт, хорошо разбираюсь`;

const LinearProgressWithLabel = (props) => {
    console.log(props);
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        <Typography variant="caption" color="textSecondary">{props.caption}</Typography>
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    );
  }

const pageSwitcher = (props) => (current) => {
    switch (current) {
        case 0: return <CandidateInfo {...props}/>
        case 2: return <Contacts />
    }
};

const CandidateInfo = (props) => {
    const [ expandLetter, setExpandLetter ] = React.useState(false);
    const text = 'Хотелось бы работать в развивающейся компании. Надоела прошлая тупая работа, одна ненависть!'
        .split(' ')
        .map(word => {
            if (posWords.includes(word)) {
                return `<span style="color: green;">${word}</span>`
            } else if (negWords.includes(word)) {
                return `<span style="color: red;">${word}</span>`
            } else {
                return word
            }
        })
        .join(' ');
    return (
        <>
            <Box display="flex" alignItems="center" flexDirection="column" margin={3}>
                <Avatar src="/candidate.png" style={{ width: '96px', height: '96px'}}/>
                <Typography variant="subtitle1" style={{ paddingTop: '20px'}}>{props.name}</Typography>
                <Typography variant="caption">Образование {props.education}</Typography>
                <Typography variant="caption">Зарплата {props.salary}</Typography>
            </Box>
            {props.percent > 80 && <Box display="flex" padding={2} style={{ background: "#F5F5F5", borderRadius: "10px" }}>
                <Avatar src="/icons/star.svg" />
                <Box display="flex" flexDirection="column" alignItems="flex-start" paddingLeft={2}>
                    <Typography variant="subtitle1">Рекомендуем отправить тестовое задание</Typography>
                    <Typography gutterBottom variant="caption">Рекомендуем отправить тестовое задание, так как резюме подходит под описание вакансии на {props.percent}%</Typography>
                    <Button variant="contained" style={{ background: '#30BAE6', color: 'white'}}>Отправить тестовое</Button>
                </Box>
            </Box>}
            <Box pt={2} pb={2}>
                <Typography variant="subtitle1" >Соответствие вакансии</Typography>
                <Box display="grid" gridTemplateColumns="32px 1fr 1fr" style={{ gap: '12px'}} alignItems="center" mt={2}>
                    <Avatar src="/icons/apple.svg" />
                        <Typography variant="subtitle2" >{props.name}</Typography>
                    <LinearProgressWithLabel value={props.percent} caption="Подходит вам на" />
                </Box>
            </Box>
            {props.skills && <Box pt={2} pb={2}>
                <Typography variant="subtitle1" >Skillset</Typography>
                {props.skills.split(',').map(renderItem)}
            </Box>}
            <Box pt={2} pb={2}>
                <Typography variant="subtitle1" >Личные качества</Typography>
                <Box display="grid" gridTemplateColumns="32px 1fr 1fr" style={{ gap: '12px'}} alignItems="center" mt={2}>
                    <Avatar src="/icons/pen.svg" />
                    <Typography variant="subtitle2" >Грамотность</Typography>
                    <LinearProgressWithCaption value={props.literacy}/>
                </Box>
                <Box display="grid" gridTemplateColumns="32px 1fr 1fr" style={{ gap: '12px'}} alignItems="center" mt={2}>
                    <Avatar src="/icons/fire.svg" />
                    <Typography variant="subtitle2" >Токсичность</Typography>
                    <LinearProgressWithCaption value={props.toxicity}/>
                </Box>
                <Box display="flex" mt={2} mb={4} style={{ background: "#F5F5F5", borderRadius: "10px" }}>
                    <Box display="flex" flexDirection="column" alignItems="flex-start" paddingLeft={2}>
                        <Typography variant="subtitle1">Анализ текста</Typography>
                        <Typography gutterBottom variant="caption" dangerouslySetInnerHTML={{__html: text}}></Typography>
                    </Box>
                </Box>
                <Box display="grid" gridTemplateColumns="32px 1fr 1fr" style={{ gap: '12px'}} alignItems="center" mt={2} mb={2}>
                    <Avatar src="/icons/compass.svg" />
                    <Typography variant="subtitle2" >Кругозор</Typography>
                    <LinearProgressWithCaption value={props.horizon}/>
                </Box>
                <Typography variant="caption" >Оценки складываются из анализа постов социальных сетей, которые опубликовал {props.name}, а так же сопроводительного письма и теста.</Typography>
            </Box>
            <Box pt={2} pb={2}>
                <Typography variant="subtitle1" >Результаты теста</Typography>
                <Box display="grid" gridTemplateColumns="32px 1fr 1fr" style={{ gap: '12px'}} alignItems="center" mt={2}>
                    <Avatar src="/icons/star.svg" />
                    <Typography variant="subtitle2" >Адекватность</Typography>
                    <LinearProgressWithCaption value={26} />
                </Box>
                <Box display="grid" gridTemplateColumns="32px 1fr 1fr" style={{ gap: '12px'}} alignItems="center" mt={2}>
                    <Avatar src="/icons/lightbulb.svg" />
                    <Typography variant="subtitle2" >Креативность</Typography>
                    <LinearProgressWithCaption value={100} />
                </Box>
                <Box display="grid" gridTemplateColumns="32px 1fr 1fr" style={{ gap: '12px'}} alignItems="center" mt={2}>
                    <Avatar src="/icons/users.svg" />
                    <Typography variant="subtitle2" >Коммуникативность</Typography>
                    <LinearProgressWithCaption value={55} />
                </Box>
                <Box display="grid" gridTemplateColumns="32px 1fr 1fr" style={{ gap: '12px'}} alignItems="center" mt={2}>
                    <Avatar src="/icons/view.svg" />
                    <Typography variant="subtitle2" >Самостоятельность</Typography>
                    <LinearProgressWithCaption value={100} />
                </Box>
            </Box>
            <Box pt={2} pb={2}>
                <Typography variant="subtitle1" >Сопроводительное письмо</Typography>
                <Typography variant="body2">
                    {expandLetter ? letter : letter.slice(0, 50)}
                </Typography>
                { (letter.length > 50 && !expandLetter) &&
                    <Typography variant="caption" style={{ color: '#30BAE6', cursor: 'pointer'}} onClick={() => setExpandLetter(true)}>Читать полностью</Typography>
                }
                { expandLetter &&
                    <Typography variant="caption" style={{ color: '#30BAE6', cursor: 'pointer'}} onClick={() => setExpandLetter(false)}>Свернуть</Typography>
                }
            </Box>
            <Box pt={2} pb={2} display="flex" justifyContent="flex-end">
                <Button variant="contained" style={{ background: '#E64646', color: 'white'}}>Отказать</Button>
                <Button variant="contained" style={{ background: '#30BAE6', color: 'white', marginLeft: '5px'}}>Отправить тестовое</Button>
            </Box>
        </>
    );
};

const renderItem = (item, i) => {
    return (
        <Box display="grid" gridTemplateColumns="32px 1fr 1fr" style={{ gap: '12px'}} alignItems="center" mt={2}>
            <Avatar src="/icons/cog.svg" />
            <Typography variant="subtitle2">{item.slice(0, 30)}</Typography>
            <LinearProgressWithLabel value={100} caption="Максимальный"/>
        </Box>
    );
};

const Contacts = (props) => {
    return (
        <Box>
            <Typography variant="subtitle1">Контакты</Typography>
            <List component="div">
            <ListItem button>
            <ListItemIcon>
                <MailIcon />
            </ListItemIcon>
            <ListItemText primary="alex.kiselev@gmail.com" style={{color: 'black'}}/>
            </ListItem>
            <ListItem button>
            <ListItemIcon>
                <PhoneIcon/>
            </ListItemIcon>
            <ListItemText primary="+7 999 233-23-55" style={{color: 'black'}}/>
            </ListItem>
            <ListItem button>
            <ListItemIcon>
                <InstagramIcon/>
            </ListItemIcon>
            <ListItemText primary="@alexandr_nuvo" style={{color: 'black'}}/>
            </ListItem>
            <ListItem button>
            <ListItemIcon>
                <Avatar src="/icons/vk.svg" style={{width:"24px", height:"24px"}}/>
            </ListItemIcon>
            <ListItemText primary="@alexandr_nuvo" style={{color: 'black'}}/>
            </ListItem>
        </List>
        </Box>
    );
};

const withPercentCaption = (Wrapped) => (props) => {
    let caption = '';
    switch (props.value) {
        case props.value < 100:
            console.log('< 100');
            caption = 'Наивысший';
            break;
        case props.value < 99:
            caption = 'Очень высокий';
            break;
        case props.value < 90:
            caption = 'Высокий';
            break;
        case props.value < 70:
            caption = 'Средний';
            break;
        case props.value < 40:
            caption = 'Очень низкий';
            break;
        case props.value < 10:
            caption = 'Нижайший';
            break;
    }
    console.log(props.value, caption);
    return <Wrapped {...props} caption={caption} />
}

const LinearProgressWithCaption = withPercentCaption(LinearProgressWithLabel);

ResponsePage.getInitialProps = (ctx) => {
    return {id: ctx.query.id}
};

export default ResponsePage;

const posWords = ['развивающейся', 'компании.', 'работать'];
const negWords = ['тупая', 'ненависть!'];