import React from 'react';
import { NavLink } from 'react-router-dom';

import cssClasses from './NavItem.module.css';

const navItem = (props) => (
    <li className={cssClasses.NavItem}>
        <NavLink 
            to={props.link}
            activeClassName={cssClasses.activeNav}>{props.children}</NavLink>
    </li>
);

export default navItem;