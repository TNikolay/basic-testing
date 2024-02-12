import lodash from 'lodash';
import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

const myPrecious = 1000000;
let account = getBankAccount(0);

beforeEach(() => {
  jest.clearAllMocks();
  account = getBankAccount(myPrecious);
});

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(myPrecious);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(myPrecious + 1)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      account.transfer(myPrecious + 1, getBankAccount(0)),
    ).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(myPrecious + 1, account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const fromSalary = 5000;
    account.deposit(fromSalary);
    expect(account.getBalance()).toBe(myPrecious + fromSalary);
  });

  test('should withdraw money', () => {
    const toBeer = 5;
    account.withdraw(toBeer);
    expect(account.getBalance()).toBe(myPrecious - toBeer);
  });

  test('should transfer money', () => {
    const stash = 10000;
    const mySecretAccount = getBankAccount(0);
    account.transfer(stash, mySecretAccount);
    expect(account.getBalance()).toBe(myPrecious - stash);
    expect(mySecretAccount.getBalance()).toBe(stash);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(lodash, 'random').mockReturnValueOnce(42).mockReturnValueOnce(1);

    const res = await account.fetchBalance();
    expect(typeof res).toBe('number');
    expect(res).toBe(42);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const newBalance = 1000;
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(newBalance);

    expect(account.getBalance()).toBe(myPrecious);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(() => account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
    expect(account.getBalance()).toBe(myPrecious);
  });
});
