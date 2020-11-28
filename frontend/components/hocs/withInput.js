import React from 'react';

const withInput = (Wrapped) => (props) => {
    const [ text, setText ] = React.useState('');
    props = {...props, text, setText};
    return <Wrapped {...props} />
};

export default withInput;