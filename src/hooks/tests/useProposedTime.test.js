import moment from 'moment';
import useProposedTime from '../useProposedTime';

describe('useProposedTime hook', () => {
  const testCases = [
    [1000, 60],
    [60, 30],
    [55, 30],
    [40, 30],
    [30, 15],
    [20, 15],
    [16, 15],
    [15, 10],
    [11, 10],
    [10, 5],
    [6, 5],
    [5, undefined]
  ];

  test.each(testCases)('for %p should return %p', (minutes, expected) => {
    const startEntry = { startDate: moment().valueOf() };
    const endEntry = { startDate: moment(startEntry.startDate).add(minutes, 'minute').valueOf() };
    expect(useProposedTime(startEntry, endEntry)).toEqual(expected);
  });
});
