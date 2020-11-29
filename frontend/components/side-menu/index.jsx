import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const SideMenu = (props) => {
    return (
        <List component="div">
            {props.items.map(renderItem(props))}
        </List>
    )
};

const renderItem = (props) => (item, i) => {
    const Icon = item.icon;
    return (
        <ListItem button selected={props.page === i} onClick={() => props.setPage(i)} key={i}>
            <ListItemIcon>
                <Icon style={{color: '#17AAD9'}}/>
            </ListItemIcon>
            <ListItemText primary={item.name} style={{color: 'black'}}/>
        </ListItem>
    );
};

export default SideMenu;