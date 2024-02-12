import { simpleCalculator, Action } from './index';

const data = {
  a: 7,
  b: 5,
};

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ ...data, action: Action.Add })).toBe(
      data.a + data.b,
    );
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ ...data, action: Action.Subtract })).toBe(
      data.a - data.b,
    );
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ ...data, action: Action.Multiply })).toBe(
      data.a * data.b,
    );
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ ...data, action: Action.Divide })).toBe(
      data.a / data.b,
    );
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ ...data, action: Action.Exponentiate })).toBe(
      data.a ** data.b,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ ...data, action: 42 })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ a: 'hi', b: 'word', action: Action.Add }),
    ).toBeNull();
  });
});
