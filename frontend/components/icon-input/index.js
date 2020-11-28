import React from 'react';

import css from './styles.less';

const IconInput = (props) =>
    <input
        placeholder={props.placeholder}
        className={css.input}
        onChange={(e) => props.setText(e.target.value)}
        value={props.text}
    />

export default IconInput; 