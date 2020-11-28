import React from 'react';

const withStateObject = (Wrapped) => (props) => {
    const {initialState, ...rest} = props;
    const [ state, update ] = React.useState(initialState);
    const setState = (newState) => () => {
        update({...state, ...newState})
    };
    return <Wrapped {...rest} state={state} setState={setState}/>
};

export default withStateObject;