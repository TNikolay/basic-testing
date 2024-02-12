import { generateLinkedList } from './index';

const DATA = [1, 2, 3];

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const res = generateLinkedList(DATA);
    console.log(res);
    expect(res).toStrictEqual({
      next: { next: { next: { next: null, value: null }, value: 3 }, value: 2 },
      value: 1,
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(DATA)).toMatchSnapshot();
  });
});
