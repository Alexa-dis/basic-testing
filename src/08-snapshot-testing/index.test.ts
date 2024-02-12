// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const expectedList = generateLinkedList([1]);
    const actualList = generateLinkedList([1]);
    expect(expectedList).toStrictEqual(actualList);
  });

  test('should generate linked list from values 2', () => {
    const elements = [1, 2];
    const result = generateLinkedList(elements);
    expect(result).toMatchSnapshot();
  });
});
