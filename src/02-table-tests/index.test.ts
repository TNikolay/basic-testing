import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: -2, action: Action.Add, expected: 0 },
  { a: 3, b: 4, action: Action.Subtract, expected: -1 },
  { a: 4, b: 3, action: Action.Subtract, expected: 1 },
  { a: 10, b: 5, action: Action.Divide, expected: 2 },
  { a: 10, b: 10, action: Action.Divide, expected: 1 },
  { a: 2, b: 5, action: Action.Multiply, expected: 10 },
  { a: 10, b: -1, action: Action.Multiply, expected: -10 },
  { a: 10, b: 2, action: Action.Exponentiate, expected: 100 },
  { a: 100, b: 0.5, action: Action.Exponentiate, expected: 10 },
];

describe('simpleCalculator', () => {
  test.each(testCases)('%#. try calculate %o', (data) => {
    expect(
      simpleCalculator({ a: data.a, b: data.b, action: data.action }),
    ).toBe(data.expected);
  });
});
