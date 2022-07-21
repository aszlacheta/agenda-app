import configureStore from 'redux-mock-store'; // ES6 modules
import React from 'react';
import renderer from 'react-test-renderer';
import Agenda from '../../agenda/Agenda';
import { Provider } from 'react-redux';

const mockStore = configureStore();

jest.mock('../components/AddEntry');
jest.mock('../components/AgendaEntry');
jest.mock('../components/AgendaEntryEdit');
jest.mock('../../../api/api');

describe('Agenda', () => {
  it('check if renders properly', () => {
    const initialState = {
      agenda: {
        entries: [],
        id: 'test',
        day: 0
      }
    };
    const store = mockStore(initialState);
    const tree = renderer
      .create(<Provider store={store}><Agenda /></Provider>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
