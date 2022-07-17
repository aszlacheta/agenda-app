import React from 'react';
import renderer from 'react-test-renderer';
import Agenda from '../../agenda/Agenda';

describe('Agenda', () => {
    it('check if renders properly', () => {
        const tree = renderer
            .create(<Agenda />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
})