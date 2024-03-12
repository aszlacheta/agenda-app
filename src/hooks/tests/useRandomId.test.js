import useRandomId from '../useRandomId';

describe('useRandomId hook', () => {
  const testCases = [
    [0, 1000, undefined],
    [-1, 50, null],
    [-4, -1, null],
    [1000, 1001, undefined]
  ];

  test.each(testCases)('for %p should return %p', (min, max, expected) => {
    const id = useRandomId(min, max);
    if (expected === null) {
      expect(id).toEqual(null);
    } else {
      expect(id).toBeGreaterThanOrEqual(min);
      expect(id).toBeLessThanOrEqual(max);
    }
  });
});
