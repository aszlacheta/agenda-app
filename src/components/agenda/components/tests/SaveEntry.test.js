import 'jsdom-global/register';
import React from 'react';
import renderer from 'react-test-renderer';
import SaveEntry from '../SaveEntry';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import moment from 'moment';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { addAgendaEntry } from '../../../../api/api';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
jest.mock('../../../../api/api');
jest.unmock('react-redux');

describe('SaveEntry component', () => {
  const entryId = 'testId';
  const entry = {
    startDate: moment(),
    name: 'Test name',
    description: 'Test description'
  };
  const initialState = {
    agenda: {
      id: 'test'
    }
  };
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('should render properly', () => {
    const tree = renderer
      .create(<Provider store={store}><SaveEntry entryId={entryId} entry={entry} /></Provider>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should save agenda entry on click', () => {
    const wrapper = mount(<Provider store={store}><SaveEntry entryId={entryId} entry={entry} /></Provider>);
    const button = wrapper.find('button');

    button.simulate('click');

    expect(addAgendaEntry).toHaveBeenCalledWith(initialState.agenda.id, entry);
  });
});
