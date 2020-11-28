import React from 'react';

import VacancyInfo from '../components/vacancy-info';

import '../styles/global.less';
import css from '../styles/regular.less';

const ChoosePage = (props) => 
    <div className={css.fullscreenWrapper}>
        <VacancyInfo caption="iOS-разработчик"/>
    </div>

export default ChoosePage;