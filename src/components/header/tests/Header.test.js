import 'jsdom-global/register';
import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../Header';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-router-dom', () => {
  return {
    __esModule: true,
    useParams: jest.fn(),
    useHistory: jest.fn(),
    BrowserRouter: ({ children }) => <div className="mocked-browser-router">{children}</div>,
    NavLink: jest.fn().mockReturnValue(<div className="mocked-nav-link" />)
  };
});

describe('Header', () => {
  it('check if renders properly', () => {
    const tree = renderer
      .create(<Header />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('check if contains exactly two links', () => {
    const wrapper = mount(<Header />);
    expect(wrapper.find('.mocked-nav-link').exists()).toBe(true);
  });
});
