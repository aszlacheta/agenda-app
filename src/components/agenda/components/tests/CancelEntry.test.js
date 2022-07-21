import 'jsdom-global/register';
import React from 'react';
import CancelEntry from '../CancelEntry';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { removeEntry, setNonEditMode } from '../../agendaSlice';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../agendaSlice');

describe('Cancel entry component', () => {
  const entryId = 'testEntryId';

  it('should render properly', () => {
    const tree = renderer
      .create(<CancelEntry entryId={entryId} isNew={false} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should remove entry if it was newly created', () => {
    const component = mount(<CancelEntry entryId={entryId} isNew={true} />);
    const button = component.find('button');

    button.simulate('click');

    expect(removeEntry).toHaveBeenCalled();
  });

  it('should cancel editing if it was already saved', () => {
    const component = mount(<CancelEntry entryId={entryId} isNew={false} />);
    const button = component.find('button');

    button.simulate('click');

    expect(setNonEditMode).toHaveBeenCalled();
  });
});
