import React from 'react';

const withOpen = (Wrapped) => (props) => {
    const [ open, setOpen ] = React.useState(false);
    const toggleOpen = () => setOpen(!open);
    props = {...props, open, toggleOpen};
    return <Wrapped {...props}/>
};

export default withOpen;