import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const baseURL = 'https://jsonplaceholder.typicode.com';

jest.mock('lodash', () => ({
  throttle: (fn: () => unknown) => fn,
}));

beforeEach(() => {
  jest.spyOn(axios, 'create').mockReturnThis();
  jest.spyOn(axios, 'get').mockResolvedValue({ data: 'response' });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const spy = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi('');

    expect(spy).toHaveBeenCalledWith({ baseURL: baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const url = '/url';
    const spy = jest.spyOn(axios, 'get');

    await throttledGetDataFromApi(url);

    expect(spy).toHaveBeenCalledWith(url);
  });

  test('should return response data', async () => {
    const res = await throttledGetDataFromApi('');
    expect(res).toEqual('response');
  });
});
