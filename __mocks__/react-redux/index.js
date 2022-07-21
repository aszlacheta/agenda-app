/* eslint-disable camelcase */
const react_redux = jest.genMockFromModule('react-redux');

react_redux.useDispatch = jest.fn().mockReturnValue(() => {});

module.exports = react_redux;
