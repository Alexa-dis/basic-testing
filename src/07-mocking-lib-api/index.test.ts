// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const relativePath = '/users';

  test('should create instance with provided base url', async () => {
    jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(relativePath);
    jest.advanceTimersByTime(5000);
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    jest.spyOn(axios.Axios.prototype, 'get');
  });

  test('should return response data', async () => {
    const data = 'test';
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockReturnValue(Promise.resolve({ data: data }));
    const result = await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();
    expect(result).toBe(data);
  });
});
