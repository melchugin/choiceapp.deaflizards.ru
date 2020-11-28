import React from 'react';

import css from './styles.less';

const withListedHorizontally = (Wrapped) => (props) => {
    return (
        <ul className={css.horizontalList}>
            {props.items.map((item, i) => <Wrapped {...props} item={item} key={i}/>)}
        </ul>
    );
};

export default withListedHorizontally;