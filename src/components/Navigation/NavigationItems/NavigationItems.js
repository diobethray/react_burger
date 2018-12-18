import React from 'react';

import cssClasses from './NavigationItems.module.css';
import NavItem from './NavItem/NavItem';

const navigationItems = (props) => (
    <ul className={cssClasses.NavigationItems}>
        <NavItem link="/burger-builder">Burger Builder</NavItem>
        {props.isAuthenticated ? <NavItem link="/orders">Orders</NavItem> : null}
        {!props.isAuthenticated 
            ? <NavItem link="/login">Login</NavItem>
            : <NavItem link="/logout">Logout</NavItem>}
    </ul>
);

export default navigationItems;