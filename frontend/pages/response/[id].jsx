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
import LinearProgress from '@material-ui/core/LinearProgress';

import InfoIcon from '@material-ui/icons/Info';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import PersonIcon from '@material-ui/icons/Person';

import '../../styles/global.less';
import css from '../../styles/regular.less';

const ResponsePage = () => {
    const [ currentPage, setCurrentPage ]= React.useState(0);
    const [ expandLetter, setExpandLetter ] = React.useState(false);
    return (
        <Layout return={true} pageTitle="iOS-разработчик" addButton={false}>
                <AppMenu />
                <div className={css.pageWrapper}>
                    <Box display="flex" alignItems="center" flexDirection="column" margin={3}>
                        <Avatar src="/candidate.png" style={{ width: '96px', height: '96px'}}/>
                        <Typography variant="subtitle1" style={{ paddingTop: '20px'}}>Александр Киселёв</Typography>
                        <Typography variant="caption">29 лет</Typography>
                    </Box>
                    <Box display="flex" padding={2} style={{ background: "#F5F5F5", borderRadius: "10px" }}>
                        <Avatar src="/icons/star.svg" />
                        <Box display="flex" flexDirection="column" alignItems="flex-start" paddingLeft={2}>
                            <Typography variant="subtitle1">Рекомендуем отправить тестовое задание</Typography>
                            <Typography gutterBottom variant="caption">Рекомендуем отправить Александру тестовое задание, так как его резюме подходит под описание вакансии на 98%</Typography>
                            <Button button variant="contained" style={{ background: '#30BAE6', color: 'white'}}>Отправить тестовое</Button>
                        </Box>
                    </Box>
                    <Box pt={2} pb={2}>
                        <Typography variant="subtitle1" >Соответствие вакансии</Typography>
                        <Typography variant="caption">Полное соответствие</Typography>
                        <Box display="grid" gridTemplateColumns="32px 1fr 1fr" style={{ gap: '12px'}} alignItems="center" mt={2}>
                            <Avatar src="/icons/apple.svg" />
                            <Typography variant="subtitle2" >iOS-разработчик</Typography>
                            <LinearProgressWithLabel value={98} caption="Подходит вам на"/>
                        </Box>
                    </Box>
                    <Box pt={2} pb={2}>
                        <Typography variant="subtitle1" >Skillset</Typography>
                        <Box display="grid" gridTemplateColumns="32px 1fr 1fr" style={{ gap: '12px'}} alignItems="center" mt={2}>
                            <Avatar src="/icons/cog.svg" />
                            <Typography variant="subtitle2" >Swift</Typography>
                            <LinearProgressWithLabel value={100} caption="Максимальный"/>
                        </Box>
                        <Box display="grid" gridTemplateColumns="32px 1fr 1fr" style={{ gap: '12px'}} alignItems="center" mt={2}>
                            <Avatar src="/icons/cog.svg" />
                            <Typography variant="subtitle2" >JavaScript</Typography>
                            <LinearProgressWithLabel value={67} caption="Высокий"/>
                        </Box>
                    </Box>
                    <Box pt={2} pb={2}>
                        <Typography variant="subtitle1" >Личные качества</Typography>
                        <Box display="grid" gridTemplateColumns="32px 1fr 1fr" style={{ gap: '12px'}} alignItems="center" mt={2}>
                            <Avatar src="/icons/pen.svg" />
                            <Typography variant="subtitle2" >Грамотность</Typography>
                            <LinearProgressWithLabel value={40} caption="средний"/>
                        </Box>
                        <Box display="grid" gridTemplateColumns="32px 1fr 1fr" style={{ gap: '12px'}} alignItems="center" mt={2}>
                            <Avatar src="/icons/fire.svg" />
                            <Typography variant="subtitle2" >Токсичность</Typography>
                            <LinearProgressWithLabel value={34} caption="средний"/>
                        </Box>
                        <Box display="grid" gridTemplateColumns="32px 1fr 1fr" style={{ gap: '12px'}} alignItems="center" mt={2} mb={2}>
                            <Avatar src="/icons/compass.svg" />
                            <Typography variant="subtitle2" >Кругозор</Typography>
                            <LinearProgressWithLabel value={100} caption="максимальный"/>
                        </Box>
                        <Typography variant="caption" >Оценки складываются из анализа постов социальных сетей Александра, а так же сопроводительного письма и теста.</Typography>
                    </Box>
                    <Box pt={2} pb={2}>
                        <Typography variant="subtitle1" >Результаты теста</Typography>
                        <Box display="grid" gridTemplateColumns="32px 1fr 1fr" style={{ gap: '12px'}} alignItems="center" mt={2}>
                            <Avatar src="/icons/star.svg" />
                            <Typography variant="subtitle2" >Адекватность</Typography>
                            <LinearProgressWithLabel value={26} caption="ниже среднего"/>
                        </Box>
                        <Box display="grid" gridTemplateColumns="32px 1fr 1fr" style={{ gap: '12px'}} alignItems="center" mt={2}>
                            <Avatar src="/icons/lightbulb.svg" />
                            <Typography variant="subtitle2" >Креативность</Typography>
                            <LinearProgressWithLabel value={100} caption="максимальный"/>
                        </Box>
                        <Box display="grid" gridTemplateColumns="32px 1fr 1fr" style={{ gap: '12px'}} alignItems="center" mt={2}>
                            <Avatar src="/icons/users.svg" />
                            <Typography variant="subtitle2" >Коммуникативность</Typography>
                            <LinearProgressWithLabel value={55} caption="средний"/>
                        </Box>
                        <Box display="grid" gridTemplateColumns="32px 1fr 1fr" style={{ gap: '12px'}} alignItems="center" mt={2}>
                            <Avatar src="/icons/view.svg" />
                            <Typography variant="subtitle2" >Самостоятельность</Typography>
                            <LinearProgressWithLabel value={100} caption="максимальный"/>
                        </Box>
                    </Box>
                    <Box pt={2} pb={2}>
                        <Typography variant="subtitle1" >Сопроводительное письмо</Typography>
                        <Typography variant="p">
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
                        <Button button variant="contained" style={{ background: '#E64646', color: 'white'}}>Отказать</Button>
                        <Button button variant="contained" style={{ background: '#30BAE6', color: 'white'}}>Отправить тестовое</Button>
                    </Box>
                </div>
                <SideMenu page={currentPage} setPage={setCurrentPage}/>
        </Layout>
    );
}

const letter = `Здравствуйте! Ваша компания опубликовала вакансию на замещение должности юриста на сайте. Мой юридический стаж составляет 12 лет, есть серьезный опыт в юриспруденции, и мне бы хотелось предложить Вам свою профессиональную помощь. Я окончил институт, хорошо разбираюсь`;

const LinearProgressWithLabel = (props) => {
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

export default ResponsePage;