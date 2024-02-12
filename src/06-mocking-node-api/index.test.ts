// Uncomment the code below and write your tests
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

describe('doStuffByTimeout', () => {
  let mockCallback: () => void;
  beforeAll(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
  });
  beforeEach(() => {
    mockCallback = jest.fn(() => console.log('Hi!'));
    jest.spyOn(global, 'setTimeout');
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(mockCallback, 1000);
    expect(setTimeout).toHaveBeenLastCalledWith(mockCallback, 1000);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(mockCallback, 1000);
    expect(mockCallback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(mockCallback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  let mockCallback: () => void;
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    mockCallback = jest.fn(() => console.log('Hi!'));
    jest.spyOn(global, 'setInterval');
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(mockCallback, 1000);
    expect(setInterval).toHaveBeenLastCalledWith(mockCallback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(mockCallback, 1000);
    expect(mockCallback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(mockCallback).toHaveBeenCalled();
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join');
    await readFileAsynchronously('index.ts');
    expect(path.join).toHaveBeenCalledWith(expect.anything(), 'index.ts');
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    expect(await readFileAsynchronously('index.ts')).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest
      .spyOn(fsPromises, 'readFile')
      .mockReturnValue(Promise.resolve('File content'));
    expect(await readFileAsynchronously('index.ts')).toBe('File content');
  });
});
