import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';
import fsp from 'fs/promises';

const DELAY = 100;

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const spy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, DELAY);

    expect(spy).toHaveBeenCalledWith(callback, DELAY);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, DELAY);

    expect(callback).toHaveBeenCalledTimes(0);
    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  const callback = jest.fn();

  test('should set interval with provided callback and timeout', () => {
    const spy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, DELAY);

    expect(spy).toHaveBeenCalledWith(callback, DELAY);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const count = 10;
    doStuffByInterval(callback, DELAY);

    jest.advanceTimersByTime(DELAY * count);
    expect(callback).toHaveBeenCalledTimes(count);
  });
});

describe('readFileAsynchronously', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const fileName = 'file.txt';
    const spy = jest.spyOn(path, 'join');
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    await readFileAsynchronously(fileName);

    expect(spy).toHaveBeenCalledWith(__dirname, fileName);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const res = await readFileAsynchronously('');

    expect(res).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const content = 'bla-bla-bla';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsp, 'readFile').mockResolvedValue(content);

    const res = await readFileAsynchronously('');

    expect(res).toBe(content);
  });
});
