import React from 'react';

import css from './styles.less';

const Input = (props) =>
    <textarea
        rows={props.rows || 1} 
        className={css.input}
        placeholder={props.placeholder}
        onChange={(e) => props.setText(e.target.value)}
        value={props.text || props.value}
    />

export default Input;