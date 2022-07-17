import React from 'react';
import renderer from 'react-test-renderer';
import Footer from '../Footer'; 
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('Footer', () => {
    it('check if renders properly', () => {
        const tree = renderer
            .create(<Footer />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('check if renders current year', () => {
        const footer = shallow(<Footer />);
        const currentYear = new Date().getFullYear();

        expect(footer.text()).toEqual(`All rights reserved @ ${currentYear}`);
    })
});