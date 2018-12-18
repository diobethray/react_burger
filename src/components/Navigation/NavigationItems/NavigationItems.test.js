import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavItem from './NavItem/NavItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('should render two <NavItem /> elements if not authenticated', () => {
        expect(wrapper.find(NavItem)).toHaveLength(2);
    });

    it('should render three <NavItem /> elements if authenticated', () => {
        //wrapper = shallow(<NavigationItems isAuthenticated/>);
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavItem)).toHaveLength(3);
    });

    it('should have Logout link', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavItem link="/logout">Logout</NavItem>)).toEqual(true);
    });
});
